/* Le déploiement renseigne ici l'URL HTTPS du collecteur Objectif Bac. */
const suiviObjectifBac = (() => {
  const endpoint = 'https://n8n.incubateur.education.gouv.fr/webhook/objectif-bac-v4-suivi';
  const idleMs = 30 * 60 * 1000;
  let visit;
  let profileId;
  let lastAttempt;
  let pending = [];
  let sending = false;
  let retryAt = 0;

  function flush() {
    if (!endpoint || sending || !pending.length || Date.now() < retryAt) return;
    const item = pending[0];
    sending = true;
    fetch(endpoint, {
      method:'POST', credentials:'omit', keepalive:true,
      headers:{'Content-Type':'application/json'}, body:JSON.stringify(item)
    }).then(response => {
      if (response.ok) {
        if (pending[0] === item) pending.shift();
        return;
      }
      retryAt = Date.now() + 15000;
    }).catch(() => {
      retryAt = Date.now() + 15000;
    }).finally(() => {
      sending = false;
      if (Date.now() >= retryAt) flush();
    });
  }

  function capture(pupil, type, details = {}) {
    if (!endpoint || !pupil.registered || !pupil.trackingOptIn) return;
    const now = Date.now();
    if (!visit || profileId !== pupil.id || now - visit.last >= idleMs) {
      profileId = pupil.id;
      visit = {id:crypto.randomUUID(), start:now, last:now};
      lastAttempt = null;
    }
    visit.last = now;
    const item = {
      version:1, app_version:"5.2", id:crypto.randomUUID(), type, occurred_at:new Date(now).toISOString(),
      visit_id:visit.id, started_at:new Date(visit.start).toISOString(),
      profile:{id:pupil.id,pseudo:pupil.pseudo,level:pupil.schoolLevel||null,territory:pupil.residenceTerritory||null},
      ...details
    };
    if (type === 'answer') lastAttempt = {id:item.id,question:item.question_id};
    if (type === 'assisted_success' && lastAttempt?.question !== item.question_id) return;
    if (type !== 'answer' && details.question_id && lastAttempt?.question === details.question_id)
      item.result_id = lastAttempt.id;
    pending.push(item);
    flush();
  }

  function optOut(id) {
    pending = pending.filter(item => item.profile.id !== id);
    if (profileId === id) {
      visit = undefined;
      lastAttempt = null;
    }
  }

  if (endpoint) {
    window.addEventListener('online', flush);
    window.setInterval(flush, 15000);
  }
  return {configured:!!endpoint,capture,optOut};
})();

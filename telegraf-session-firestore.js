module.exports = function (opts) {
  const options = Object.assign({
    property: 'session',
    store: null,
    getSessionKey: (ctx) => ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`
  }, opts)
  if(!options.store){
    throw Error("База не указана")
  }

  const ttlMs = options.ttl && options.ttl * 1000

  return (ctx, next) => {
    const key = options.getSessionKey(ctx)
    if (!key) {
      return next(ctx)
    }
    const now = new Date().getTime()
    let docRef = options.store.collection('sessions').doc(key);
    return docRef.get()
      .then((doc) => {
        if(!doc.exists || (doc.data().expires!=null && doc.data().expires>= now)) {
          session = {}
        }else{
          session = doc.data().session;
        }
        Object.defineProperty(ctx, options.property, {
          get: function () { return session },
          set: function (newValue) { session = Object.assign({}, newValue) }
        })
        return next(ctx).then(() =>options.store.collection('sessions').doc(key).set({
          session,
          expires: ttlMs ? now + ttlMs : null
        }))
      })
  }
}

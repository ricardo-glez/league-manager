//Este script es elq ue nos proporcionaron en la api en el punto 7.2 login
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const {
    mainStory
} = require('storyboard/lib/withConsoleListener');
console.log('TEXT', fetch('http://p0298.tracktio.com:9000/'))
    /*En este código pasa algo similar al de python,
    ya que el html no muestra incluye el formulario para hacer login
    y por consiguiente no se puede ingresar a la plataforma
    En algunos navegadores como (Firefox, Chromium y Vivaldi) me sucede el mismo problema, */
Promise.resolve().then(() => fetch('http://p0298.tracktio.com:9000/auth', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'inputEmail': 'dgonzalez',
            'inputPassword': 's3cret',
        }),
    })
    //Cuando se ejecuta el script con esta linea comentada me mmuestra el siguiente error:
    /* 
    main ERROR Could not authenticate
    main ERROR   name: 'SyntaxError'
    main ERROR   message: 'Unexpected end of JSON input'
    main ERROR   stack: SyntaxError: Unexpected end of JSON input
    main ERROR   stack:     at Object.parse (native)
    main ERROR   stack:     at /home/erre/node_modules/node-fetch/lib/body.js:48:15
    main ERROR   stack:     at process._tickCallback (internal/process/next_tick.js:103:7)
*/
    //.then((res) => res.json())
    /*
    Al ejecutar el código omitiendo la linea de arriba, el código me genera un status 405 mostrado a continuacion
            erre@erreK:~/Documentos/Denovoc/sports analytics/league-manager/scrapper$ node logintracksphere.js 
2017-01-05T15:40:32.083Z           storyboard INFO  ┌── ROOT STORY: Node.js 6.9.2 on Linux 64-bit, SB 2.3.1 [CREATED]
2017-01-05T15:40:32.084Z           storyboard INFO  Log filter: *:DEBUG
TEXT Promise { <pending> }
2017-01-05T15:40:32.777Z                 main INFO  Results:
                                         main INFO    url: 'http://p0298.tracktio.com:9000/auth'
                                         main INFO    status: 405
                                         main INFO    statusText: 'Method Not Allowed'
                                         main INFO    ok: false
                                         main INFO    bodyUsed: false
                                         main INFO    size: 0
                                         main INFO    timeout: 0
                                         main INFO    _raw: []
                                         main INFO    _abort: false
                                         main INFO    headers:
                                         main INFO      _headers:
                                         main INFO        access-control-allow-credentials: ['true']
                                         main INFO        access-control-allow-headers: ['Origin, X-Requested-With, Content-Type, Accept']
                                         main INFO        access-control-allow-methods: ['GET,PUT,POST,DELETE,OPTIONS']
                                         main INFO        allow: ['GET, HEAD, OPTIONS']
                                         main INFO        accept: ['*']
                                         main INFO        content-length: ['0']
                                         main INFO        date: ['Thu, 05 Jan 2017 15:40:11 GMT']
                                         main INFO        connection: ['close']
                                         main INFO    body:
                                         main INFO      readable: true
                                         main INFO      domain: null
                                         main INFO      _eventsCount: 1
                                         main INFO      _maxListeners: undefined
                                         main INFO      writable: false
                                         main INFO      allowHalfOpen: true
                                         main INFO      _readableState:
                                         main INFO        objectMode: false
                                         main INFO        highWaterMark: 16384
                                         main INFO        length: 0
                                         main INFO        pipes: null
                                         main INFO        pipesCount: 0
                                         main INFO        flowing: null
                                         main INFO        ended: true
                                         main INFO        endEmitted: false
                                         main INFO        reading: false
                                         main INFO        sync: false
                                         main INFO        needReadable: false
                                         main INFO        emittedReadable: true
                                         main INFO        readableListening: false
                                         main INFO        resumeScheduled: false
                                         main INFO        defaultEncoding: 'utf8'
                                         main INFO        ranOut: false
                                         main INFO        awaitDrain: 0
                                         main INFO        readingMore: false
                                         main INFO        decoder: null
                                         main INFO        encoding: null
                                         main INFO        buffer:
                                         main INFO          head: null
                                         main INFO          tail: null
                                         main INFO          length: 0
                                         main INFO      _events:
                                         main INFO        end:
                                         main INFO          listener: {}
                                         main INFO      _writableState:
                                         main INFO        objectMode: false
                                         main INFO        highWaterMark: 16384
                                         main INFO        needDrain: false
                                         main INFO        ending: true
                                         main INFO        ended: true
                                         main INFO        finished: true
                                         main INFO        decodeStrings: true
                                         main INFO        defaultEncoding: 'utf8'
                                         main INFO        length: 0
                                         main INFO        writing: false
                                         main INFO        corked: 0
                                         main INFO        sync: true
                                         main INFO        bufferProcessing: false
                                         main INFO        onwrite: {}
                                         main INFO        writecb: null
                                         main INFO        writelen: 0
                                         main INFO        bufferedRequest: null
                                         main INFO        lastBufferedRequest: null
                                         main INFO        pendingcb: 0
                                         main INFO        prefinished: true
                                         main INFO        errorEmitted: false
                                         main INFO        bufferedRequestCount: 0
                                         main INFO        corkedRequestsFree:
                                         main INFO          next: null
                                         main INFO          entry: null
                                         main INFO          finish: {}
                                         main INFO      _transformState:
                                         main INFO        afterTransform: {}
                                         main INFO        needTransform: false
                                         main INFO        transforming: false
                                         main INFO        writecb: null
                                         main INFO        writechunk: null
                                         main INFO        writeencoding: null
2017-01-05T15:40:32.784Z           storyboard INFO  └── ROOT STORY: Node.js 6.9.2 on Linux 64-bit, SB 2.3.1 [CLOSED]
*/
    .then((res) => {
        mainStory.info('Results:', {
            attach: res
        });
        //console.log('Results',res.token)
        return res.token;
    }).catch((err) => {
        mainStory.error('Could not authenticate', {
            attach: err
        });
        process.exit(1);
    }))
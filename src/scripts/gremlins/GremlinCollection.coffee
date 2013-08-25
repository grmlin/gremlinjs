goog.provide 'gremlins.GremlinCollection'
goog.require 'gremlins.NameProvider'
goog.require 'gremlins.GremlinDomElement'

class gremlins.GremlinCollection
  _queue : null

  constructor : ->
    @_queue = []
    @_bindScroll()
    @_didScroll = no
    @_scrollTimer = no

  _bindScroll : ->
    if window.addEventListener
      window.addEventListener('scroll', @_scrollHandler, false)
    else if window.attachEvent
      window.attachEvent('onscroll', @_scrollHandler)

  add : (elArray) ->
    @_addGremlinElements el for el in elArray
    #@_queue = (new gremlins.GremlinDomElement(el, cssClass) for el in elArray)
    @_processQueue()

  _addGremlinElements : (el) ->
    names = gremlins.NameProvider.getNames el
    gremlins.NameProvider.flagProcessedElement el
    @_queue.push new gremlins.GremlinDomElement(el, name) for name in names

  _processQueue : ->
    #console.log "processing gremlin queue"
    remaining = []
    for element in @_queue
      element.check()
      remaining.push(element) unless element.hasGremlin()

    @_queue = remaining
    gremlin.debug.updateGremlinLog()
    #console.log "processing gremlins finished, remaining: "
    #console.dir @_queue


  process : ->
    @_processQueue()

  _scrollHandler : =>
    return yes if @_queue.length is 0

    unless @_didScroll
      @_scrollTimer = setInterval(=>
        if @_didScroll
          @_didScroll = false
          clearTimeout @_scrollTimer
          @process()
      , 250)
    @_didScroll = true
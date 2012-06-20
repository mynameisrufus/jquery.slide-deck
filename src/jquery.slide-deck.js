/*!
 * jQuery Slide Deck - CSS3 transition and JS animate siled deck
 * Copyright(c) 2012 Rufus Post <rufuspost@gmail.com>
 * MIT Licensed.
 *
 * https://github.com/mynameisrufus/jquery.slide-deck.git
 */

(function($, undefined) {
    "use strict";

    $.slideDeck = {
        version: "0.1"
    }

    $.fn.slideDeck = function(options) {

        var deck = this

        // Delegate .transition() calls to .animate()
        // if the browser can't do CSS transitions.
        // Punch out x and y to left and top.
        var delegate = function() {
            $.fn.transition = $.fn.animate

            var registerCssHook = function(index, hook) {
                $.fx.step[hook[0]] = function(fx){
                    $.cssHooks[hook[0]].set( fx.elem, fx.now + fx.unit );
                }

                $.cssHooks[hook[0]] = {
                    get: function(elem, computed, extra) {
                        return $.css(elem, hook[1]);
                    },
                    set: function(elem, value) {
                        elem.style[hook[1]] = value;
                    }
                }
            }

            var hooks = [['x', 'left'], ['y', 'top']]
            $.each(hooks, registerCssHook)
        }

        var opts = $.extend(true, {
            easing: { transition: 'ease', animate: 'swing' },
            speed: 500,
            zTopAbs: 220,
            zTop: 210,
            zQue: 200,
            zBot: 190
        }, options)

        var easing = opts.easing.transition

        if (!$.support.transition) {
            delegate()
            easing = opts.easing.animate
        }

        // Place all slides at the bottom of the stack by default.
        this.css('zIndex', opts.zBot).hide()

        // Place the first slide ontop by default.
        var active = this[0]
        $(active).css('zIndex', opts.zTopAbs).show()

        var queue = []

        var _after = function(elem) {
            queue.pop()

            $(active).css('zIndex', opts.zBot).hide()
            active.scrollTop = 0

            $.event.trigger('exited', elem, active)
            $.event.trigger('entered', active, elem)

            active = elem

            return deck
        }

        var _before = function(elem) {
            queue.push(elem)

            $(elem).show()

            $.event.trigger('outgoing', elem, active)
            $.event.trigger('incomming', active, elem)

            return deck
        }

        var transitions = {
            vertical: {
                exit: function(elem) {
                    var $elem   = $(elem),
                        $active = $(active),
                        height  = $elem.height()

                    $elem.stop(true, true).css({
                        'zIndex': opts.zQue,
                        'y': 0,
                        'x': 0
                    })

                    $active.stop(true, true).css({
                        'zIndex': opts.zTopAbs,
                        'y': 0,
                        'x': 0
                    })

                    var after = function() { _after(elem) }

                    $active.transition({'y': height}, opts.speed, easing, after)

                    return $elem
                },
                enter: function(elem) {
                    var $elem   = $(elem),
                        $active = $(active),
                        height  = $elem.height()

                    $elem.stop(true, true).css({
                        'zIndex': opts.zTopAbs,
                        'y': height,
                        'x': 0
                    })

                    $active.stop(true, true).css({
                        'zIndex': opts.zQue,
                        'y': 0,
                        'x': 0
                    })

                    var after = function() { _after(elem) }

                    return $elem.transition({'y': 0}, opts.speed, easing, after)
                }
            },
            horizontal: {
                left: function(elem) {
                    var $elem   = $(elem),
                        $active = $(active),
                        width = $elem.width()

                    $elem.stop(true, true).css({
                        'zIndex': opts.zTop,
                        'x': width,
                        'y': 0
                    })

                    $active.stop(true, true).css({
                        'zIndex': opts.zQue,
                        'y': 0
                    })

                    var after = function() { _after(elem) }

                    $active.transition({'x': - width}, opts.speed, easing, after)

                    return $elem.transition({'x': 0}, opts.speed, easing)
                },
                right: function(elem) {
                    var $elem   = $(elem),
                        $active = $(active),
                        width = $elem.width()

                    $elem.stop(true, true).css({
                        'zIndex': opts.zTop,
                        'x': - width,
                        'y': 0
                    })

                    $active.stop(true, true).css({
                        'zIndex': opts.zQue,
                        'y': 0
                    })

                    var after = function() { _after(elem) }

                    $active.transition({'x': width}, opts.speed, easing, after)

                    return $elem.transition({'x': 0}, opts.speed, easing)
                }
            }
        }

        var transition = function(elem) {
            if (queue.length === 1) return

            _before(elem)

            var enter = $(elem).data('transition'),
                exit  = $(active).data('transition'),
                posel = $(elem).data('position'),
                posac = $(active).data('position')

            if (exit === 'vertical') {
                return transitions.vertical.exit(elem)
            } else if (enter === 'vertical') {
                return transitions.vertical.enter(elem)
            } else if (posel > posac) {
                return transitions.horizontal.left(elem)
            } else {
                return transitions.horizontal.right(elem)
            }
        }

        this.next = function() {
            var self  = this

            this.each(function(index, elem) {
                if (elem.id === active.id) {
                    var next  = self.get(index + 1),
                        first = self.get(0)
                    return transition(next || first)
                }
            })

            return this
        }

        this.previous = function() {
            var self  = this

            this.each(function(index, elem) {
                if (elem.id === active.id) {
                    var previous = self.get(index - 1),
                            last = self.get(self.length -1)
                    return transition(previous || last)
                }
            })

            return this
        }

        this.change = function(id) {
            this.each(function(index, elem) {
                if (elem.id === id && id !== active.id) {
                    return transition(elem)
                }
            })

            return this
        }

        return this;
    }
}).call(this, jQuery);

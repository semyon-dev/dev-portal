(function ($) {
    'use strict';
    // Reduce
    $.fn.reduce = function (fnReduce, initialValue) {
        var values = this,
                previousValue = initialValue;

        values.each(function (index, currentValue) {
            previousValue = fnReduce.call(
                    currentValue,
                    previousValue,
                    currentValue,
                    index,
                    values
                    );
        });

        return previousValue;
    };

    // Title sections
    $(':header[id]').each(function () {
        var $self = $(this);

        $self.html(
                '<a href="#' + $self.attr('id') + '" class="title-anchor-link">#</a> ' + $self.html()
                );
    });

    var getHeadingLevel = function ($el) {
        var tagName = $el.prop('tagName').toLowerCase();

        if (
                !tagName ||
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(tagName) === -1
                ) {
            return false;
        }

        return parseInt(tagName.replace('h', ''), 10);
    };

    var headings = $(':header[id]').reduce(function (previousValue, currentValue) {
        var currentHeading = {
            childrens: [],
        };

        currentHeading.$el = $(currentValue);
        currentHeading.level = getHeadingLevel(currentHeading.$el);

        if (!currentHeading.$el.length || currentHeading.level === false) {
            return previousValue;
        }

        previousValue.push(currentHeading);

        return previousValue;
    }, []);

    var majik = function (previousValue, currentHeading) {
        if (!currentHeading.$el.length || currentHeading.level === false) {
            return previousValue;
        }

        if (previousValue.length < 1) {
            return [currentHeading];
        }

        var previousHeadingLevel = previousValue[ previousValue.length - 1 ].level;

        if (currentHeading.level > previousHeadingLevel) {
            previousValue[ previousValue.length - 1 ].childrens.push(currentHeading);
        } else {
            previousValue.push(currentHeading);
        }

        return previousValue;
    };

    var reduceLevels = function (list) {
        list = list.reduce(majik, []);

        var i;
        for (i = 0; i < list.length; i += 1) {
            if (!list[ i ].childrens || !list[ i ].childrens.length) {
                continue;
            }

            list[ i ].childrens = reduceLevels(list[ i ].childrens);
        }

        return list;
    };

    var generateList = function (list, isFirstLevel) {
        var $ul = $('<ul></ul>');
        $ul.addClass('level-' + list[ 0 ].level);

        if (true === isFirstLevel) {
            $ul.addClass('nav');
        }

        var i, $li;
        for (i = 0; i < list.length; i += 1) {
            $li = $('<li></li>');
            $li.append(
                    '<a class="js-smooth-scroll" href="#' + list[ i ].$el.attr('id') + '">' +
                    list[ i ].$el.text().replace(/^#\ /, '') +
                    '</a>'
                    );

            if (list[ i ].childrens && list[ i ].childrens.length) {
                $li.append(generateList(list[ i ].childrens));
                $li.addClass('has-submenu');
            }

            $ul.append($li);
        }

        return $ul;
    };

    if (headings.length) {
        headings = reduceLevels(headings);

        generateList(headings, true).appendTo('.js-sections');
    }

    // Smooth anchor scrolling
    var $jsSmoothScroll = $('.js-smooth-scroll');

    $jsSmoothScroll.click(function () {
        var scroll_one = $($(this).attr('href')).offset().top;
        var height_diff = $('.snet-navbar_secondary').outerHeight();
        $(".sections-list ul li.active").removeClass("active");
        $(this).parent("li").addClass("active");
        $('html, body').animate({
            //scrollTop: ($( $( this ).attr( 'href' ) ).offset().top)-48
            scrollTop: (scroll_one - height_diff)
        }, 1200);

        return false;
    });

    var handleSectionsListSize = function () {
        $('.sections-list').css('width', $('.sections-list-wrapper').width());
    };

    handleSectionsListSize();
    $(window).on('resize', handleSectionsListSize);

    // Affix init
    $(window).on('load', function () {
        $('.js-affix').affix({
            offset: {
                top: function () {
                    return (
                            this.top = $('.hero-subheader').outerHeight(true) + 100
                            );
                },
                bottom: function () {
                    return (
                            this.bottom = $('.js-footer-area').outerHeight(true) + 80
                            );
                }
            }
        });
    });

    /*        
     $(window).scroll(function(e){ 
     var $el = $('.testodutest'); 
     //var $el2 = $('.left-nav');   
     //var st=$('.on-this-page').offset().top;
     //alert(st);
     var isPositionFixed = ($el.css('position') == 'fixed'); 
     if ($(this).scrollTop() > 195 && !isPositionFixed){ 
     $el.css({'position': 'fixed', 'top': '0px', 'right': '0px','padding-top':'0px'}); 
     }
     if ($(this).scrollTop() < 195 && isPositionFixed){
     $el.css({'position': 'static', 'top': '0px','right': '0px','padding-top':'45px'}); 
     } 
     
     });    
     */




    // Get the modal
    var modal = document.getElementById("snetModal");

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $('.snet-card_maincontents img').click(function () {
        //alert($(this).attr('src'));    
        var modal = document.getElementById("snetModal");
        $("#snetModal img").attr('src', $(this).attr('src'));
        //modal.style.display = "block";
        $(modal).fadeIn();
    });

    $('#snetModal-close').click(function () {
        var modal = document.getElementById("snetModal");
        //modal.style.display = "none";
        $(modal).fadeOut();
    });


}(jQuery));

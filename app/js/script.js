/*
 * Runek
 * http://www.scoopthemes.com/
 *
 * Copyright (c) 2014, ScoopThemes
 * Licensed under the BSD license.
 */
'use strict';

var appMaster = {

    preLoader: function(){
        var imageSources = [];
        $('img').each(function() {
            var sources = $(this).attr('src');
            imageSources.push(sources);
        });
        if($(imageSources).load()){
            $('.pre-loader').fadeOut('slow');
        }
    },

    navSpy: function(){
        /* affix the navbar after scroll below header */
        $('#nav.navbar-static-top').affix({
            offset: {
                top: $('header').height() - $('#nav').height()
            }
        });

        /* highlight the top nav as scrolling occurs */
        $('body').scrollspy({
            target: '#nav'
        });
    },

    smoothScroll: function() {
        // Smooth Scrolling 
        $('a[href*=#]:not([href=#carousel-example-generic], [href=#testimonials-carousel], [href=#carousel-team], [href=#carousel-slider])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    },

    scollToTop: function(){
        /* smooth scrolling for scroll to top */
        $('.scroll-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
    },

    headerSlider: function(){

        var docHeight = $(window).height();
        
        $("#slider").height(docHeight + "px");

        $('.mh-container').height(docHeight + "px");

    },
    owlCarousel: function(){
        var owl = $("#owl-screenshots");

        owl.owlCarousel({
            pagination:false
        });

        setInterval(function(){ 
            owl.trigger('owl.next');
        }, 3000);

        $(".owl-next").click(function() {
            owl.trigger('owl.next');
        });

        $(".owl-prev").click(function(){
            owl.trigger('owl.prev');
        });
    },
    animateScript: function() {
       $('.scrollpoint.sp-effect1').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInLeft');},{offset:'100%'});
       $('.scrollpoint.sp-effect2').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInRight');},{offset:'100%'});
       $('.scrollpoint.sp-effect3').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInDown');},{offset:'100%'});
       $('.scrollpoint.sp-effect4').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeIn');},{offset:'100%'});
       $('.scrollpoint.sp-effect5').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated fadeInUp');},{offset:'100%'});
       $('.scrollpoint.sp-effect6').waypoint(function(){$(this).toggleClass('active');$(this).toggleClass('animated bounceIn');},{offset:'100%'});
    }, 
    year:function() {
       var date = new Date(), fullYear = date.getFullYear();
       $('.year').html(fullYear)    
    }, 
    brand: function() {
       var brand = "Links"
       $('.brand').html(brand)    
    }, 
    formValidate: function() {
        (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);
    }, 
    submitForm: function() {
        var submit = $("#submit"), contactForm = $("#form"), thanks = $("#thanks");
        var contactsRef = firebase.database().ref("contacts")
        submit.click(function(e) {
            appMaster.addContact(contactsRef, $('#name').val(), $('#email').val())
            contactForm.fadeOut()
            thanks.removeClass('hide')
            thanks.fadeIn()
            e.preventDefault();
        })
  },
  addContact: function(ref, name, email) {
    ref.child(name + appMaster.randomChars()).set({
        username: name,
        email: email
    });
  }, 
  randomChars: function() {
      var str = "abcdefghijklmnopqrstuvwxyz0123456789"
      var arr = str.split("")
      var generatedStr = []
      for (var i = 0; i < 6 ; i++) {
          var newStr = arr[Math.floor((Math.random() * arr.length))]
          console.log(newStr)
          generatedStr.push(newStr)
      }
     return "-"+generatedStr.join("")
  }
};

$(document).ready(function() {  
    appMaster.smoothScroll();
    appMaster.animateScript();
    appMaster.navSpy();
    appMaster.scollToTop();
    appMaster.headerSlider();
    appMaster.owlCarousel();
    appMaster.year();
    appMaster.brand();
    appMaster.submitForm();
});
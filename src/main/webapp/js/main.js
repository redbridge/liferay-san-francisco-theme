/*
 * Copyright (c) 2012 Whistler AB. All rights reserved.
 */

AUI().use("aui-viewport");

AUI().ready('liferay-navigation-interaction', 'aui-viewport', 'aui-dialog', 'node', 'event',
    function (A) {
        function screenWidth() {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
        }

        if (screenWidth() <= 640) {
            A.one('#navigation').one('ul').all('li').each(function () {
                if (this.one('.child-menu')) {
                    if (this.hasClass('selected')) {
                        this.one('.child-menu').removeClass('hide');
                        this.one('.child-menu').addClass('show');
                    } else {
                        this.one('.child-menu').removeClass('show');
                        this.one('.child-menu').addClass('hide');
                    }
                }
            });
        } else {
            var navigation = A.one('#navigation');

            if (navigation) {
                navigation.plug(Liferay.NavigationInteraction);
            }

            var signIn = A.one('#sign-in');
            if (signIn) {
                signIn.on('click', function () {
                    window.location = "/sign-in";
                });
            }

            var isIE = (function () {
                var div = document.createElement('div');
                div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
                return (div.getElementsByTagName('i').length === 1);
            }());


            if (isIE) {
                A.one('#navigation').one('ul').all('li').each(function () {
                    if (this.one('.child-menu')) {
                        this.on('mouseover', function (event) {
                            this.one('.child-menu').setStyle('display', 'block');
                        });
                    }
                });

                A.one('#navigation').one('ul').all('li').each(function () {
                    if (this.one('.child-menu')) {
                        this.on('mouseout', function (event) {
                            this.one('.child-menu').setStyle('display', 'none');
                        });
                    }
                });
            }


            var breadcrumbsNode = A.one("#breadcrumbs");
            var breadcrumbsInnerNode = A.one("#breadcrumbs .breadcrumbs");
            if (breadcrumbsInnerNode) {
                var breadcrumbsTrigger = A.one('#breadcrumbs-trigger');
                if (breadcrumbsTrigger) {
                    breadcrumbsTrigger.on('click', function () {
                        if (breadcrumbsInnerNode.getStyle("display") === "block") {
                            breadcrumbsInnerNode.setStyle("display", "none");
                        } else {
                            breadcrumbsInnerNode.setStyle("display", "block");
                        }
                    });
                }
            }
        }
    }
);
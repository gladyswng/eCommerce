(function(g){var window=this;'use strict';var A4=function(a){g.U.call(this,{D:"div",K:"ytp-miniplayer-ui"});this.cg=!1;this.player=a;this.N(a,"minimized",this.hg);this.N(a,"onStateChange",this.qC)},B4=function(a){g.jM.call(this,a);
this.i=new A4(this.player);this.i.hide();g.XL(this.player,this.i.element,4);a.Ge()&&(this.load(),g.L(a.getRootNode(),"ytp-player-minimized",!0))};
g.v(A4,g.U);g.k=A4.prototype;
g.k.NA=function(){this.tooltip=new g.JP(this.player,this);g.G(this,this.tooltip);g.XL(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.kc=new g.fN(this.player);g.G(this,this.kc);this.vg=new g.U({D:"div",K:"ytp-miniplayer-scrim"});g.G(this,this.vg);this.vg.Aa(this.element);this.N(this.vg.element,"click",this.Qw);var a=new g.U({D:"button",Ca:["ytp-miniplayer-close-button","ytp-button"],U:{"aria-label":"Close"},S:[g.mK()]});g.G(this,a);a.Aa(this.vg.element);this.N(a.element,"click",this.Oh);
a=new g.i0(this.player,this);g.G(this,a);a.Aa(this.vg.element);this.Qn=new g.U({D:"div",K:"ytp-miniplayer-controls"});g.G(this,this.Qn);this.Qn.Aa(this.vg.element);this.N(this.Qn.element,"click",this.Qw);var b=new g.U({D:"div",K:"ytp-miniplayer-button-container"});g.G(this,b);b.Aa(this.Qn.element);a=new g.U({D:"div",K:"ytp-miniplayer-play-button-container"});g.G(this,a);a.Aa(this.Qn.element);var c=new g.U({D:"div",K:"ytp-miniplayer-button-container"});g.G(this,c);c.Aa(this.Qn.element);this.AI=new g.GO(this.player,
this,!1);g.G(this,this.AI);this.AI.Aa(b.element);b=new g.DO(this.player,this);g.G(this,b);b.Aa(a.element);this.nextButton=new g.GO(this.player,this,!0);g.G(this,this.nextButton);this.nextButton.Aa(c.element);this.xg=new g.wP(this.player,this);g.G(this,this.xg);this.xg.Aa(this.vg.element);this.Dc=new g.LO(this.player,this);g.G(this,this.Dc);g.XL(this.player,this.Dc.element,4);this.Dw=new g.U({D:"div",K:"ytp-miniplayer-buttons"});g.G(this,this.Dw);g.XL(this.player,this.Dw.element,4);a=new g.U({D:"button",
Ca:["ytp-miniplayer-close-button","ytp-button"],U:{"aria-label":"Close"},S:[g.mK()]});g.G(this,a);a.Aa(this.Dw.element);this.N(a.element,"click",this.Oh);a=new g.U({D:"button",Ca:["ytp-miniplayer-replay-button","ytp-button"],U:{"aria-label":"Close"},S:[g.rK()]});g.G(this,a);a.Aa(this.Dw.element);this.N(a.element,"click",this.bR);this.N(this.player,"presentingplayerstatechange",this.Cc);this.N(this.player,"appresize",this.qb);this.N(this.player,"fullscreentoggled",this.qb);this.qb()};
g.k.show=function(){this.rd=new g.gn(this.Mo,null,this);this.rd.start();this.cg||(this.NA(),this.cg=!0);0!==this.player.getPlayerState()&&g.U.prototype.show.call(this);this.Dc.show();this.player.unloadModule("annotations_module")};
g.k.hide=function(){this.rd&&(this.rd.dispose(),this.rd=void 0);g.U.prototype.hide.call(this);this.player.Ge()||(this.cg&&this.Dc.hide(),this.player.loadModule("annotations_module"))};
g.k.va=function(){this.rd&&(this.rd.dispose(),this.rd=void 0);g.U.prototype.va.call(this)};
g.k.Oh=function(){this.player.stopVideo();this.player.Ma("onCloseMiniplayer")};
g.k.bR=function(){this.player.playVideo()};
g.k.Qw=function(a){if(a.target===this.vg.element||a.target===this.Qn.element)g.R(this.player.T().experiments,"kevlar_miniplayer_play_pause_on_scrim")?g.pJ(this.player.rb())?this.player.pauseVideo():this.player.playVideo():this.player.Ma("onExpandMiniplayer")};
g.k.hg=function(){g.L(this.player.getRootNode(),"ytp-player-minimized",this.player.Ge())};
g.k.Kc=function(){this.Dc.Tb();this.xg.Tb()};
g.k.Mo=function(){this.Kc();this.rd&&this.rd.start()};
g.k.Cc=function(a){g.T(a.state,32)&&this.tooltip.hide()};
g.k.qb=function(){g.WO(this.Dc,0,this.player.Xa().getPlayerSize().width,!1);g.NO(this.Dc)};
g.k.qC=function(a){this.player.Ge()&&(0===a?this.hide():this.show())};
g.k.ac=function(){return this.tooltip};
g.k.ue=function(){return!1};
g.k.Ie=function(){return!1};
g.k.Jh=function(){return!1};
g.k.nx=function(){};
g.k.Rl=function(){};
g.k.Xp=function(){};
g.k.hm=function(){return null};
g.k.Ai=function(){return new g.eg(0,0,0,0)};
g.k.handleGlobalKeyDown=function(){return!1};
g.k.handleGlobalKeyUp=function(){return!1};
g.k.Uo=function(a,b,c,d,e){var f=0,h=d=0,l=g.Cg(a);if(b){c=g.tn(b,"ytp-prev-button")||g.tn(b,"ytp-next-button");var m=g.tn(b,"ytp-play-button"),n=g.tn(b,"ytp-miniplayer-expand-watch-page-button");c?f=h=12:m?(b=g.Ag(b,this.element),h=b.x,f=b.y-12):n&&(h=g.tn(b,"ytp-miniplayer-button-top-left"),f=g.Ag(b,this.element),b=g.Cg(b),h?(h=8,f=f.y+40):(h=f.x-l.width+b.width,f=f.y-20))}else h=c-l.width/2,d=25+(e||0);b=this.player.Xa().getPlayerSize().width;e=f+(e||0);l=g.ge(h,0,b-l.width);e?(a.style.top=e+"px",
a.style.bottom=""):(a.style.top="",a.style.bottom=d+"px");a.style.left=l+"px"};
g.k.showControls=function(){};
g.k.fk=function(){};
g.k.Fj=function(){return!1};g.v(B4,g.jM);B4.prototype.create=function(){};
B4.prototype.Xh=function(){return!1};
B4.prototype.load=function(){this.player.hideControls();this.i.show()};
B4.prototype.unload=function(){this.player.showControls();this.i.hide()};g.vM.miniplayer=B4;})(_yt_player);

(this["webpackJsonpreact-shogi"]=this["webpackJsonpreact-shogi"]||[]).push([[0],{10:function(e,t,n){e.exports=n(17)},17:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(9),c=n.n(a),s=(n(7),n(1)),u=function e(){Object(s.a)(this,e)};u.LENGTH=9,u.UNCLICKED=95,u.WHITE=7,u.MT=16,u.PIECES=["\u98db","\u89d2","\u91d1","\u9280","\u6842","\u9999","\u6b69","\u7389","\u7adc","\u99ac","","\u5168","\u572d","\u674f","\u3068",""],u.NUM=["","","\u30cb","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u5341\u4e00","\u5341\u4e8c","\u5341\u4e09","\u5341\u56db","\u5341\u4e94","\u5341\u516d","\u5341\u4e03","\u5341\u516b"];var o=n(5),l=n(3),p=n(2),h=n(4),E=function(){function e(t,n,r){Object(s.a)(this,e),this._out=void 0,this._turn=void 0,this._piece_num=void 0,this._out=t,this._turn=n,this._piece_num=r}return Object(o.a)(e,[{key:"out",value:function(){return this._out}},{key:"turn",value:function(){return this._turn}},{key:"piece_num",value:function(){return this._piece_num}},{key:"promote",value:function(){this._piece_num+=u.MT/2,this._out=u.PIECES[this._piece_num]}}]),e}(),_=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this,u.PIECES[n],e,n))}return Object(h.a)(t,e),t}(E),f=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this,u.PIECES[n],e,n))}return Object(h.a)(t,e),t}(E),v=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this,u.PIECES[n],e,n))}return Object(h.a)(t,e),t}(E),m=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this,u.PIECES[n],e,n))}return Object(h.a)(t,e),t}(E),T=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this,u.PIECES[n],e,n))}return Object(h.a)(t,e),t}(E),b=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this,u.PIECES[n],e,n))}return Object(h.a)(t,e),t}(E),N=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this,u.PIECES[n],e,n))}return Object(h.a)(t,e),t}(E),d=function(e){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:7;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this,u.PIECES[n],e,n))}return Object(h.a)(t,e),t}(E),k=function(e){function t(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16;return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).call(this," ",e,n))}return Object(h.a)(t,e),t}(E);function H(e){var t="";return e.is_captured?t="captured":(t="square piece",e.is_black||(t+=" white")),e.is_final&&(t+=" final"),e.is_clicked&&(t+=" attack"),i.a.createElement("button",{className:t,onClick:e.onClick},e.value)}var L=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"renderSquare",value:function(e,t,n){var r=this,a=n-2*u.WHITE,c=Math.floor(a/u.LENGTH),s=a%u.LENGTH;return i.a.createElement(H,{key:n,is_final:e,is_clicked:t,value:this.props.squares[c][s].out(),is_black:this.props.squares[c][s].turn(),is_captured:!1,onClick:function(){return r.props.onClick(n)}})}},{key:"content",value:function(e){for(var t=[],n=u.LENGTH-1;n>=0;--n)n*u.LENGTH+e===this.props.final_piece-2*u.WHITE?t.push(this.renderSquare(!0,!1,n*u.LENGTH+e+2*u.WHITE)):n*u.LENGTH+e===this.props.clicked_piece-2*u.WHITE?t.push(this.renderSquare(!1,!0,n*u.LENGTH+e+2*u.WHITE)):t.push(this.renderSquare(!1,!1,n*u.LENGTH+e+2*u.WHITE));return t}},{key:"render",value:function(){for(var e=new Array,t=0;t<u.LENGTH;++t)e=e.concat(i.a.createElement("div",{className:"board-row ley",key:t},this.content(t)));return i.a.createElement("div",null,e)}}]),t}(i.a.Component),w=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"renderSquare",value:function(e,t){var n=this;return this.props.is_black?i.a.createElement(H,{key:t,is_final:!1,is_clicked:e,value:u.PIECES[t],is_black:!0,is_captured:!0,onClick:function(){return n.props.onClick(t)}}):i.a.createElement(H,{key:t,is_final:!1,is_clicked:e,value:u.PIECES[t],is_black:!1,is_captured:!0,onClick:function(){return n.props.onClick(t+u.WHITE)}})}},{key:"render",value:function(){for(var e=new Array,t=this.props.turn?this.props.clicked_piece:this.props.clicked_piece-u.WHITE,n=this.props.is_black,r=this.props.turn,a=0;a<u.WHITE;++a){var c=this.props.squares[a];c>0&&(e=a===t&&n===r?e.concat(i.a.createElement("div",{className:"board-row ley",key:a},this.renderSquare(!0,a))):e.concat(i.a.createElement("div",{className:"board-row ley",key:a},this.renderSquare(!1,a))),c>1&&(e=e.concat(i.a.createElement("div",{className:"board-row ley",key:"num"+a},i.a.createElement("button",{className:"number"},u.NUM[c])))))}return i.a.createElement("div",null,e)}}]),t}(i.a.Component),G=n(6),j=n.n(G);function O(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1",t=(arguments.length>1&&void 0!==arguments[1]&&arguments[1],[]),n=0;n<u.LENGTH;++n){t[n]=[];for(var r=0;r<u.LENGTH;++r)t[n].push(new k)}if("lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1"===e){for(var i=0;i<u.LENGTH;++i)t[i][2]=new _(!1),t[i][6]=new _(!0);t[0][0]=new f(!1),t[8][0]=new f(!1),t[0][8]=new f(!0),t[8][8]=new f(!0),t[1][0]=new v(!1),t[7][0]=new v(!1),t[1][8]=new v(!0),t[7][8]=new v(!0),t[2][0]=new m(!1),t[6][0]=new m(!1),t[2][8]=new m(!0),t[6][8]=new m(!0),t[3][0]=new T(!1),t[5][0]=new T(!1),t[3][8]=new T(!0),t[5][8]=new T(!0),t[1][1]=new b(!1),t[7][7]=new b(!0),t[7][1]=new N(!1),t[1][7]=new N(!0),t[4][0]=new d(!1),t[4][8]=new d(!0)}return t}function C(e,t){var n=new k;return 0===e&&(n=new N(t)),1===e&&(n=new b(t)),2===e&&(n=new T(t)),3===e&&(n=new m(t)),4===e&&(n=new v(t)),5===e&&(n=new f(t)),6===e&&(n=new _(t)),n}function y(){return new Array(u.WHITE).fill(0)}function I(e,t,n,r,i){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:-1,c=arguments.length>6&&void 0!==arguments[6]?arguments[6]:-1,s=!(arguments.length>7&&void 0!==arguments[7])||arguments[7],o=t[r][i].piece_num();if(6!==o)if(2===o||3===o||4===o||7===o||11<=o&&o<=14){var l,p;4===o?(l=new Array(-1,1),p=new Array(-2,-2)):3===o?(l=new Array(-1,0,1,1,-1),p=new Array(-1,-1,-1,1,1)):2===o||11<=o&&o<=14?(l=new Array(-1,0,1,1,0,-1),p=new Array(-1,-1,-1,0,1,0)):s?(l=new Array(-1,0,1,1,1,0,-1,-1),p=new Array(-1,-1,-1,0,1,1,1,0)):(l=new Array(0),p=new Array(0));for(var h=0;h<l.length;++h){var E=n?r+l[h]:r-l[h],_=n?i+p[h]:i-p[h];0<=E&&E<u.LENGTH&&0<=_&&_<u.LENGTH&&(++e[E][_],E===a&&_===c&&(e[u.LENGTH][0]=r*u.LENGTH+i,e[u.LENGTH][1]=o))}}else if(5!==o)if(1!==o&&9!==o)if(0!==o&&8!==o);else{for(var f=new Array(0,1,0,-1),v=new Array(-1,0,1,0),m=0;m<f.length;++m)for(var T=r+f[m],b=i+v[m];0<=T&&T<u.LENGTH&&0<=b&&b<u.LENGTH&&(++e[T][b],T===a&&b===c&&(e[u.LENGTH][0]=r*u.LENGTH+i,e[u.LENGTH][1]=o),t[T][b].piece_num()===u.MT||7===t[T][b].piece_num()&&t[T][b].turn()!==n);)T+=f[m],b+=v[m];if(8===o){f=new Array(-1,1,1,-1),v=new Array(-1,-1,1,1);for(var N=0;N<f.length;++N){var d=r+f[N],k=i+v[N];0<=d&&d<u.LENGTH&&0<=k&&k<u.LENGTH&&(++e[d][k],d===a&&k===c&&(e[u.LENGTH][0]=r*u.LENGTH+i,e[u.LENGTH][1]=o))}}}else{for(var H=new Array(-1,1,1,-1),L=new Array(-1,-1,1,1),w=0;w<H.length;++w)for(var G=r+H[w],j=i+L[w];0<=G&&G<u.LENGTH&&0<=j&&j<u.LENGTH&&(++e[G][j],G===a&&j===c&&(e[u.LENGTH][0]=r*u.LENGTH+i,e[u.LENGTH][1]=o),t[G][j].piece_num()===u.MT||7===t[G][j].piece_num()&&t[G][j].turn()!==n);)G+=H[w],j+=L[w];if(9===o){H=new Array(0,1,0,-1),L=new Array(-1,0,1,0);for(var O=0;O<H.length;++O){var C=r+H[O],y=i+L[O];0<=C&&C<u.LENGTH&&0<=y&&y<u.LENGTH&&(++e[C][y],C===a&&y===c&&(e[u.LENGTH][0]=r*u.LENGTH+i,e[u.LENGTH][1]=o))}}}else for(var I=-1,g=n?i+I:i-I;0<=g&&g<u.LENGTH&&(++e[r][g],r===a&&g===c&&(e[u.LENGTH][0]=r*u.LENGTH+i,e[u.LENGTH][1]=o),t[r][g].piece_num()===u.MT||7===t[r][g].piece_num()&&t[r][g].turn()!==n);)g=n?g+I:g-I;else if(n?0!==i:i!==u.LENGTH-1){var S=n?i-1:i+1;++e[r][S],r===a&&S===c&&(e[u.LENGTH][0]=r*u.LENGTH+i,e[u.LENGTH][1]=o)}}function g(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:-1,c=!(arguments.length>6&&void 0!==arguments[6])||arguments[6],s=[],o=0;o<u.LENGTH+1;++o)s[o]=new Array(u.LENGTH).fill(0);if(-1!==n)return I(s,e,t,n,r),s;for(var l=0;l<u.LENGTH;++l)for(var p=0;p<u.LENGTH;++p)e[l][p].piece_num()!==u.MT&&e[l][p].turn()===t&&I(s,e,t,l,p,i,a,c);return s}function S(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1;if(-1===r)for(var a=0;a<u.LENGTH;++a)for(var c=0;c<u.LENGTH;++c)if(7===e[a][c].piece_num()&&e[a][c].turn()===n){r=a,i=c,a=u.LENGTH,c=u.LENGTH;break}var s=g(e,n,-1,-1,-1,-1,!1),o=g(e,!n,-1,-1,r,i),l=o[r][i];if(0===l)return 0;if(l>1)return 10*l;var p=o[u.LENGTH][0],h=Math.floor(p/u.LENGTH),E=p%u.LENGTH,_=o[u.LENGTH][1];if(0===_||1===_||5===_||8===_||9===_){var f=h-r,v=E-i;0!==f&&(f/=Math.abs(f)),0!==v&&(v/=Math.abs(v));for(var m=r+f,T=i+v;m!==h||T!==E;){if(s[m][T]>0)return 11;for(var b=0;b<u.WHITE;++b)if(0!==t[b]){var N=j.a.cloneDeep(e);if(N[m][T]=C(b,n),A(e,N,t,-1,-1,r,T,!n)){if(6===b&&W(N,m,n))continue;return 11}}m+=f,T+=v}}return 10}function P(e,t,n){for(var r=-1,i=-1,a=0;a<u.LENGTH;++a)for(var c=0;c<u.LENGTH;++c)if(7===e[a][c].piece_num()&&e[a][c].turn()===n){r=a,i=c,a=u.LENGTH,c=u.LENGTH;break}var s=S(e,t,n,r,i);if(0===s)return!1;for(var o=g(e,!n),l=new Array(1,1,0,-1,-1,-1,0,1),p=new Array(0,1,1,1,0,-1,-1,-1),h=0;h<l.length;++h){var E=r+l[h],_=i+p[h];if(!(E<0||u.LENGTH<=E||_<0||u.LENGTH<=_)&&((e[E][_].piece_num()===u.MT||e[E][_].turn()!==n)&&0===o[E][_]))return!1}return Math.floor(s/10)>1||s%10<1}function A(e,t,n,r,i,a,c,s){var o=t[a][c].piece_num();return-1===r?4===o?s?c>1:c<u.LENGTH-1-1:5===o?s?0!==c:c!==u.LENGTH-1:6!==o||(s?0!==c:c!==u.LENGTH-1)&&!P(t,n,!s):g(e,s,r,i)[a][c]>0}function W(e,t,n){for(var r=0,i=0;i<u.LENGTH;++i)6===e[t][i].piece_num()&&e[t][i].turn()===n&&++r;return r>=2}var M=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(p.a)(t).call(this,e))).state={start_pos:n.props.start_pos,start_black_piece:n.props.start_black_piece,start_white_piece:n.props.start_white_piece,current_pos:n.props.current_pos,current_black_piece:n.props.current_black_piece,current_white_piece:n.props.current_white_piece,kifu:n.props.kifu,turn:n.props.turn,moves:n.props.moves,moves_sub:n.props.moves_sub,clicked_piece:n.props.clicked_piece,final_piece:n.props.final_piece,black_name:n.props.black_name,white_name:n.props.white_name,is_black:n.props.is_black},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleClick",value:function(e){var t=this;if(!(this.state.moves<0)){var n=this.state.clicked_piece,r=this.state.turn;if(e<2*u.WHITE)return n===u.UNCLICKED?void((r?e<u.WHITE:e>=u.WHITE)&&this.setState({clicked_piece:e})):void this.setState({clicked_piece:u.UNCLICKED});var i=Math.floor((e-2*u.WHITE)/u.LENGTH),a=(e-2*u.WHITE)%u.LENGTH,c=this.state.current_pos.concat();if(this.state.clicked_piece!==u.UNCLICKED)if(c[i][a].piece_num()===u.MT||c[i][a].turn()!==r){var s=j.a.cloneDeep(this.state.current_black_piece),o=j.a.cloneDeep(this.state.current_white_piece),l=this.state.moves,p=j.a.cloneDeep(c),h=j.a.cloneDeep(s),E=j.a.cloneDeep(o),_=-1,f=-1;if(n<2*u.WHITE){if(c[i][a].piece_num()!==u.MT)return void this.setState({clicked_piece:u.UNCLICKED});r?(--h[n],p[i][a]=C(n,r)):(--E[n-u.WHITE],p[i][a]=C(n-u.WHITE,r))}else{_=Math.floor((n-2*u.WHITE)/u.LENGTH),f=(n-2*u.WHITE)%u.LENGTH;var v=p[i][a];p[i][a]=p[_][f],p[_][f]=new k;var m=v.piece_num();m!==u.MT&&(m>u.WHITE&&(m-=u.MT/2),r?++h[m]:++E[m])}if(A(c,p,r?E:h,_,f,i,a,r)&&0===S(p,r?h:E,r)){var T=p[i][a].piece_num();if(-1!==_&&(r?a<3||f<3:a>u.LENGTH-1-3||f>u.LENGTH-1-3)&&T<u.WHITE&&""!==u.PIECES[T+u.MT/2]){var b=!1;5<=T&&T<=6?(r?0===a:a===u.LENGTH-1)&&(p[i][a].promote(),b=!0):4===T&&(r?a<2:a>u.LENGTH-1-2)&&(p[i][a].promote(),b=!0),b||window.confirm("\u6210\u308a\u307e\u3059\u304b\uff1f")&&p[i][a].promote()}return this.setState({current_pos:p,current_black_piece:h,current_white_piece:E,turn:!r,moves:l+1,moves_sub:l+1,clicked_piece:u.UNCLICKED,final_piece:e}),-1===_&&6===p[i][a].piece_num()&&W(p,i,r)?(setTimeout((function(){alert("\u53cd\u5247\uff08\u4e8c\u6b69\uff09\u306b\u3088\u308a"+l+"\u624b\u306b\u3066"+(r?t.state.white_name:t.state.black_name)+"\u306e\u52dd\u3061\u3067\u3059\uff01")}),200),void this.setState({moves:-1})):P(p,r?E:h,!r)?(setTimeout((function(){alert("\u307e\u3067"+(l+1)+"\u624b\u306b\u3066"+(r?t.state.black_name:t.state.white_name)+"\u306e\u52dd\u3061\u3067\u3059\uff01")}),200),void this.setState({moves:-1})):void 0}this.setState({clicked_piece:u.UNCLICKED})}else this.setState({clicked_piece:u.UNCLICKED});else{if(c[i][a].piece_num()===u.MT||c[i][a].turn()!==r)return;this.setState({clicked_piece:e})}}}},{key:"resign",value:function(){var e=this,t=this.state.moves;if(!(t<0))return window.confirm("\u6295\u4e86\u3057\u307e\u3059\u304b\uff1f")?(setTimeout((function(){alert("\u307e\u3067"+t+"\u624b\u306b\u3066"+(e.state.turn?e.state.white_name:e.state.black_name)+"\u306e\u52dd\u3061\u3067\u3059\uff01")}),200),void this.setState({moves:-1})):void 0}},{key:"rotate",value:function(){this.setState({is_black:!this.state.is_black})}},{key:"render",value:function(){var e=this,t="game-info";this.state.is_black||(t+=" white");var n=this.state.moves_sub;return i.a.createElement("div",{className:"game-info"},i.a.createElement("div",{className:"game"},i.a.createElement("div",{className:"center bold"},"\u25b3"+this.state.white_name+"\u3000"+n+"\u624b\u76ee\u3000\u25b2"+this.state.black_name),i.a.createElement("div",{className:t},i.a.createElement("div",{className:"game-info-white white"},i.a.createElement("div",null,"\u25b3"),i.a.createElement(w,{squares:this.state.current_white_piece,clicked_piece:this.state.clicked_piece,is_black:!1,turn:this.state.turn,onClick:function(t){return e.handleClick(t)}})),i.a.createElement("div",{className:"game-board"},i.a.createElement(L,{squares:this.state.current_pos,onClick:function(t){return e.handleClick(t)},clicked_piece:this.state.clicked_piece,final_piece:this.state.final_piece})),i.a.createElement("div",{className:"game-info-black"},i.a.createElement("div",null,"\u25b2"),i.a.createElement(w,{squares:this.state.current_black_piece,clicked_piece:this.state.clicked_piece,is_black:!0,turn:this.state.turn,onClick:function(t){return e.handleClick(t)}})))),i.a.createElement("button",{className:"status",onClick:function(){return e.rotate()}},"\u53cd\u8ee2"),i.a.createElement("button",{className:"status",onClick:function(){return e.resign()}},"\u6295\u4e86"))}}]),t}(i.a.Component);c.a.render(i.a.createElement(M,{start_pos:O(),start_black_piece:y(),start_white_piece:y(),current_pos:O(),current_black_piece:y(),current_white_piece:y(),kifu:[],turn:!0,moves:0,moves_sub:0,clicked_piece:u.UNCLICKED,final_piece:u.UNCLICKED,black_name:"\u5148\u624b",white_name:"\u5f8c\u624b",is_black:!0}),document.getElementById("root"))},7:function(e,t,n){}},[[10,1,2]]]);
//# sourceMappingURL=main.bcbf0d78.chunk.js.map
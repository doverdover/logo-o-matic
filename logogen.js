/*
  Logo-o-Matic Canvas version
  Homepage: http://github.com/codepo8/logo-o-matic
  Copyright (c) 2011 Christian Heilmann
  Code licensed under the BSD License:
  http://wait-till-i.com/license.txt
*/
(function(){
  if(document.querySelector){
  
/* 
  Font definitions - these are the x coordinates and widths of all chars 
  in a certain font cropped from allfonts.png
*/    
    var fonts = {
          ollie:{
            height:52,a:[4,40],b:[45,38],c:[86,37],d:[123,40],e:[163,40],
            f:[203,33],g:[246,36],h:[286,36],i:[335,13],j:[365,32],k:[405,39],
            l:[455,15],m:[486,61],n:[550,39],o:[590,39],p:[630,39],q:[670,37],
            r:[708,41],s:[756,30],t:[790,37],u:[833,36],v:[871,37],w:[910,65],
            x:[983,30],y:[1015,40],z:[1063,34],'$':[1100,20],offset:206
          },
          qpd:{
            height:31,a:[3,24],b:[27,24],c:[51,24],d:[75,24],e:[99,24],
            f:[123,24],g:[147,24],h:[171,24],i:[195,24],j:[219,24],k:[243,24],
            l:[267,24],m:[291,24],n:[315,24],o:[339,24],p:[363,24],q:[387,24],
            r:[411,24],s:[435,24],t:[459,24],u:[483,24],v:[507,24],w:[531,24],
            x:[555,24],y:[580,24],z:[605,24],'$':[640,24],offset:80
          }, 
          deekay:{
            height:32,a:[0,32],b:[32,32],c:[64,32],d:[96,32],e:[128,32],
            f:[160,32],g:[192,32],h:[224,32],i:[256,16],j:[272,32],k:[304,32],
            l:[336,32],m:[368,48],n:[416,32],o:[448,32],p:[480,32],q:[512,32],
            r:[544,32],s:[576,32],t:[608,32],u:[640,32],v:[672,32],w:[704,48],
            x:[752,32],y:[784,32],z:[816,32],'$':[870,32],offset:280
          },
          deekaydontmeetcrestfli: {
            height:32,a:[0,32],b:[32,32],c:[64,32],d:[96,32],e:[128,32],
            f:[160,32],g:[192,32],h:[224,32],i:[256,16],j:[272,32],k:[304,32],
            l:[336,32],m:[368,48],n:[416,32],o:[448,32],p:[480,32],q:[512,32],
            r:[544,32],s:[576,32],t:[608,32],u:[640,32],v:[672,32],w:[704,48],
            x:[752,32],y:[784,32],z:[816,32],'$':[870,32],offset:280
          },
          deekaycomalandspriteschains:{
            height:130,a:[0,54],b:[54,54],c:[108,54],d:[162,54],e:[216,54],
            f:[270,48],g:[316,54],h:[370,54],i:[424,26],j:[450,26],k:[476,54],
            l:[530,26],m:[556,78],n:[634,54],o:[688,54],p:[742,54],q:[796,54],
            r:[850,54],s:[904,54],t:[958,48],u:[1006,54],v:[1060,54],w:[1114,78],
            x:[1192,54],y:[1246,54],z:[1300,54],'!':[1380,26],comma:[1406,26],fullstop:[1354,26],'$':[1432,26],offset:330
          },
          orcdutchbreezeflielite:{
            height:75,a:[0,40],b:[40,40],c:[80,40],d:[120,40],e:[160,40],
            f:[200,32],g:[232,40],h:[272,40],i:[312,16],j:[328,32],k:[360,40],
            l:[400,16],m:[416,64],n:[480,40],o:[520,40],p:[560,40],q:[600,40],
            r:[640,32],s:[672,40],t:[712,32],u:[744,40],v:[784,40],w:[824,64],
            x:[888,40],y:[928,40],z:[968,40],'$':[1008,16],offset:2
          }, 
          compyxvisualdelight2multicolor1995:{
            height:98,a:[0,48],b:[48,48],c:[96,48],d:[144,48],e:[192,48],
            f:[240,32],g:[272,48],h:[320,48],i:[368,16],j:[385,35],k:[420,49],
            l:[470,16],m:[486,80],n:[566,48],o:[614,48],p:[662,48],q:[710,48],
            r:[758,48],s:[808,46],t:[854,32],u:[886,48],v:[934,48],w:[982,80],
            x:[1062,48],y:[1110,48],z:[1158,48],'$':[1206,16],'!':[1222,16],'.':[1238,16],offset:109
          }, 
          deekaycomalandspritesnochains: {
            height:133,a:[0,54],b:[54,54],c:[108,54],d:[162,54],e:[216,54],
            f:[270,48],g:[316,54],h:[370,54],i:[424,26],j:[450,26],k:[476,54],
            l:[530,26],m:[556,78],n:[634,54],o:[688,54],p:[742,54],q:[796,54],
            r:[850,54],s:[904,54],t:[958,48],u:[1006,54],v:[1060,54],w:[1114,78],
            x:[1192,54],y:[1246,54],z:[1300,54],'!':[1380,26],',':[1406,26],'.':[1354,26],'$':[1432,26],offset:462
          }
        },

/* 
  Grabbing the canvas and all the neccesary elements from the DOM. 
  The image with the .current class defines which font is preset by
  reading out its ID
*/ 
        n = document.querySelector('#nav'),
        ctx = document.querySelector('canvas').getContext('2d'),
        srcimg = document.querySelector('#fonts'),
        save = document.querySelector('#save'),
        input = document.querySelector('#text'),
        old = document.querySelector('.current'),
        set = fonts[old.id],

/*
  Only allow characters a-z, space and the dollar sign. I use dollar to
  define a space in the coordinates above
*/
        valid = /^[a-z|\s|\$]+$/,
        rep = /[^a-z|\s|\$]+/g;

/*
  If there is a ?text=moo parameter on the URL, grab the text, remove the 
  space encoding and call sanitise()
*/
    window.addEventListener('load',function(e){
      var url = document.location.search.split('?text=')[1];
      if(url){
        sanitise(url.replace(/%20/g,' '));
      }
    },false); 

/*
  Using event delegation, set the font by clicking on the images in the 
  nav list. Call sanitise to immediately show changes and shift the current
  class in the HTML to the clicked element
*/
    n.addEventListener('click',function(e){
      var t = e.target;
      if(t.tagName === 'IMG'){
        set = fonts[t.id];
        old.className = '';
        t.className = 'current';
        old = t;
        sanitise(input.value);
      }
      e.preventDefault();
    },false);

/*
  Every time the key is released inside the input element, sanitise the value
*/
    input.addEventListener('input',function(e){
      sanitise(input.value);
      e.preventDefault();
    },false);

/*
  Replace all invalid characters, set $ instead of space (to get a valid
  label in the charmap) and call the draw function() when things went well
*/
    function sanitise(s){
      s = s.toLowerCase();
      if(!valid.test(s)){ 
        s = s.replace(rep,''); 
      }
      input.value = s;
      s = s.replace(/\s/g,'$');
      if(s){
        draw(s);
      }
    };

    function draw(s){
/* 
  Split the string into the different characters
*/
      var str = s.split(''), w = 0, h = 0, i = 0, j = str.length;

/*
  Offset the output by five pixels top and left
*/
      var destX = 5;
      var destY = 5;

/* 
  Calculate the dimensions of the canvas by adding the char widths and 
  reading the height
*/
      for(i=0;i<j;i++){ 
        w += set[str[i]][1]; 
      }
      ctx.canvas.width = w + 10;
      ctx.canvas.height = set.height + 10;

/*
  Fill the canvas with black (this is so Rolling Stones...)
*/
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

/*
  Crop the characters one by one from the image and copy them into the 
  Canvas - add to the destX to copy them in one after the other
*/
      for(i=0;i<j;i++){
        ctx.drawImage(
          srcimg, set[str[i]][0], set.offset, set[str[i]][1], 
          set.height, destX, destY, set[str[i]][1], set.height
        );
        destX += set[str[i]][1];
      }

/*
  Create a new image from the Canvas data and add it to the document for 
  saving.
*/
      save.innerHTML = '<a href="'+ctx.canvas.toDataURL('image/png')+'" download="'+input.value+'.png"><img src="'+ctx.canvas.toDataURL('image/png')+'"></a><br><small>Click to download</small>';
    };

  }
})();
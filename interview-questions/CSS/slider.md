``` html
<div class="slider"></div>
```

``` css
.ani{
  width:480px;
  height:320px;
  margin:50px auto;
  overflow: hidden;
  box-shadow:0 0 5px rgba(0,0,0,1);
  background-size: cover;
  background-position: center;
  -webkit-animation-name: "loops";
  -webkit-animation-duration: 20s;
  -webkit-animation-iteration-count: infinite;
}
@-webkit-keyframes "loops" {
  0% {
      background:url(xx1.jpg) no-repeat;             
  }
  25% {
      background:url(xx2.jpg) no-repeat;
  }
  50% {
      background:url(xx3.jpg) no-repeat;
  }
  75% {
      background:url(xx4.jpg) no-repeat;
  }
  100% {
      background:url(xx5.jpg) no-repeat;
  }
}
```
function Carousel($ct){
    this.init($ct)
    this.bind()
    this.autoPlay()
}

Carousel.prototype = {
    init: function($ct){
        this.$ct = $ct
        this.$leftArrow = this.$ct.find('.icon-left-arrow')
        this.$rightArrow = this.$ct.find('.icon-right-arrow-copy')
        this.$bullet = this.$ct.find('.bullet')
        this.$imgCt = this.$ct.find('.img-ct')
        this.$imgs = this.$imgCt.find('li')
        this.imgWidth = this.$imgs.width()
        this.imgCount = this.$imgs.length

        this.isAnimate = false
        this.index = 0
        this.$imgCt.append(this.$imgs.first().clone())
        this.$imgCt.prepend(this.$imgs.last().clone())
        // console.log(this.$imgs.length)
        this.$imgCt.width(this.imgWidth * (this.imgCount+2))
        this.$imgCt.css('left', -this.imgWidth)
    },
    bind: function(){
        var _this = this
        this.$leftArrow.on('click',function(){
            console.log('playPre')
            _this.playPre(1)
        })
        this.$rightArrow.on('click',function(){
            console.log('playNext')
            _this.playNext(1)
        })

        this.$bullet.on('click','li',function(e){

            var $this = $(this)
            console.log($this.index())
            var index = $this.index()
            if(_this.index < index){
                _this.playNext(index- _this.index)
            }else {
                _this.playPre(_this.index - index)
            }
        })
    },
    playNext: function(len){
        var _this = this
        // console.log('playNext')
        if(this.isAnimate) return
        this.isAnimate = true
        this.$imgCt.animate({
            left: '-='+ this.imgWidth*len
        },function(){
            _this.index += len
            console.log(_this.index)
            if(_this.index === _this.imgCount){
                _this.$imgCt.css('left', -_this.imgWidth)
                _this.index =0
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    playPre: function(len){
        var _this = this
        // console.log('playNext')
        if(this.isAnimate) return
        this.isAnimate = true
        this.$imgCt.animate({
            left: '+='+ this.imgWidth * len
        },function(){
            _this.index -= len
            console.log(_this.index)
            if(_this.index < 0){
                _this.$imgCt.css('left', -_this.imgWidth * _this.imgCount)
                _this.index = _this.imgCount-1
                console.log(_this.index)
            }
            _this.setBullet()
            _this.isAnimate = false
        })
    },
    setBullet: function(){
        this.$bullet.find('li').eq(this.index).addClass('active')
        .siblings().removeClass('active')
    },
    autoPlay: function(){
        var _this = this
        var clock = setInterval(function(){
            _this.playNext(1)
        },3000)
    },
    stopPlay: function(){
        clearInterval(autoPlay)
    }
}

var a = new Carousel($('.carousel').eq(0))
var b = new Carousel($('.carousel').eq(1))
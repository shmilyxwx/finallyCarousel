var $dots = $(".dots .dot");
var $dotslength = $(".dots .dot").length
var current = 0
var $imgbox = $(".imgbox");

makeFakeSlides()

$imgbox.css('transform', 'translateX(-100vw)')

bindEvents()

$(".next").on('click',function(){
	goToslide(current+1)
	clearInterval(time)
})
$(".pre").on('click',function(){
	goToslide(current-1)
	clearInterval(time)
})

var time = setInterval(function(){
	goToslide(current+1)	
},2000)

$(".imgbox").hover(function(){
	clearInterval(time)
},function(){
	time = setInterval(function(){
		goToslide(current+1)	
	},2000)
})

function bindEvents() {

	$(".dots").on('click', 'span', function(e) {
		let $span = $(e.currentTarget)
		let index = $span.index();
		goToslide(index)
		
	})
}
function goToslide(index){
	
	if(index>$dotslength-1){
		index = 0
	}else if(index <0){
		index = $dotslength-1
	}
	$(".dots .dot").eq(index).addClass('active').siblings().removeClass('active')
	if(current == $dotslength - 1 && index == 0) {
				$imgbox.css({
					transform: `translateX(${-($dotslength+1)*100}vw)`
				}).one('transitionend',
					function() {
						$imgbox.hide()
							.offset()
						$imgbox.css({
								transform: `translateX(${-(index+1)*100}vw)`
							})
							.show()
					}
				)
			} else if(current == 0 && index == $dotslength - 1) {
				$imgbox.css({
					transform: `translateX(0vw)`
				}).one('transitionend',
					function() {
						$imgbox.hide()
							.offset()
						$imgbox.css({
								transform: `translateX(${-(index+1)*100}vw)`
							})
							.show()
					}
				)
			} else {
				$imgbox.css({
					transform: `translateX(${-(index+1)*100}vw)`
				})
			}
			current = index	
}

function makeFakeSlides() {
	var $firstCopy = $imgbox.find('img').eq(0).clone(true)
	var $lastCopy = $imgbox.find('img').eq($dots.length - 1).clone(true)

	$imgbox.append($firstCopy)
	$imgbox.prepend($lastCopy)
}
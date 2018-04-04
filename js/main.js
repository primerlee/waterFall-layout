$(function () {
    waterFall();
    var dataInt = {'data': [{'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '3.jpg'}, {'src': '4.jpg'}]};
    window.onscroll = function () {
        if (checkScroll()) {
            $.each(dataInt.data, function (index, value) {
                var $box = $("<div>").addClass("box").appendTo($("#main"));
                var $pic = $("<div>").addClass("pic").appendTo($box);
                $("<img>").attr("src", "./images/" + $(value).attr("src")).appendTo($pic);
            });
            waterFall();
        }
    }
});

function waterFall() {
    var $main = $("#main");
    var $box = $(".box");

    var boxWidth = $box.eq(0).outerWidth();
    var cols = Math.floor($(window).width() / boxWidth);
    $main.css({
        "width": cols * boxWidth,
        "margin": "0 auto"
    });

    var boxHeightArr = [];
    $box.each(function (index, value) {
        var boxHeight = $box.eq(index).height();
        if (index < cols) {
            boxHeightArr[index] = boxHeight;
        } else {
            var boxMinHeight = Math.min.apply(null, boxHeightArr);
            var boxMinIndex = $.inArray(boxMinHeight, boxHeightArr);

            $(value).css({
                "position": "absolute",
                "left": boxMinIndex * $box.eq(0).outerWidth(),
                "top": boxMinHeight + 15
            });
            boxHeightArr[boxMinIndex] += $box.eq(index).outerHeight();

        }
    })
}

function checkScroll() {
    var $box = $(".box");
    var lastBoxHeight = $box.last().get(0).offsetTop + Math.floor($box.last().height() / 2);

    var scrollTop = $(window).scrollTop();
    var documentH = $(document).width();
    return (lastBoxHeight > scrollTop + documentH) ? false : true;
}
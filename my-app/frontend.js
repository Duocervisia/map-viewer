import $ from "jquery";

export default class Frontend{
    main

    //last one is also default
    legend

    legendElement 

    constructor(main){
        let that = this;
        this.main = main;
        this.legendElement = $('.legend')
        console.log(this.main.jsonLoader)

        this.legend = this.main.jsonLoader.data.legend;

        let i = 0;
        this.legend.forEach(element => {
            if(element.special){
                that.legendElement.find(".special").append('<div class="legend-element" index="'+ i +'"><div class="ball" style="background-color: '+ element.color +';"></div>: '+ element.typ +'</div>');
            }else{
                that.legendElement.find(".normal").append('<div class="legend-element" index="'+ i +'"><div class="ball" style="background-color: '+ element.color +';"></div>: '+ element.typ +'</div>');
            }
            i++;
        });

        this.setEvents()
    }
    updateElements(){
        let i = 0;
        this.legend.forEach(element => {
            if(element.enabled){
                $(".legend-element[index="+i+"]").removeAttr("disabled")
            }else{
                $(".legend-element[index="+i+"]").attr("disabled", "")
            }
            i++;
        });
    }
    setEvents(){
        let that = this;
        $(".legend-element").on( "click", function() {
            that.legend[$( this ).attr("index")].enabled = !that.legend[$( this ).attr("index")].enabled;
            that.main.berlinMap.selectorChanged();
            that.updateElements();
        });
        $('.arrow').on('click', function() {
            console.log($(this).hasClass("active"))
            if ($(this).hasClass("active")) {
                console.log(1)
                $(".stats-content-wrapper").attr("disabled", "")
            }else{

                $(".stats-content-wrapper").removeAttr("disabled")
            }
            $(this).toggleClass('active');

        });
        // $(".arrow").on( "click", function() {
        //     if ($(this).find('.arrow-mask').hasClass("top")) {
        //         $(this).find('.arrow-mask').removeClass("top")
        //         $(".stats-content-wrapper").attr("disabled", "")
        //     }else{
        //         $(this).find('.arrow-mask').addClass("top")
        //         $(".stats-content-wrapper").removeAttr("disabled")

        //     }
        // });
    }
    getColorByType(typ){
        let color = null;
        this.legend.forEach(element => {
            if(element.typ == typ){
                color = element.color
            }
        });
        if(color === null){
            color = this.legend[this.legend.length - 1].color
        }
        return color;
    }
    isTypeEnabled(typ){
        let enabled;
        this.legend.forEach(element => {
            if(element.typ == typ){
                enabled = element.enabled
            }
        });
        if(enabled === undefined){
            enabled = this.legend[this.legend.length - 1].enabled
        }
        return enabled;
    }
}
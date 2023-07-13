jQuery(document).ready(function($) {
    let fr_ajax_url = plugin_ajax_object.ajax_url;

    $('body').on('click','.fr_add_discount_submit',function(){
        get_discount_object();
        let discount_JSON=JSON.stringify(discount_obj);
        $.ajax({
            url:fr_ajax_url,
            type : 'POST',
            data: {
                action: "fr_add_discount_save",
                discount_JSON:discount_JSON
            },
            success: function(response) {
                if (response) {
                    console.log(response);
                        $('.fr_update_discount_modal_wrapper').hide(3000);
                        fr_refresh_list();
                } else {

                }
            }
        })
    })
    $('body').on('click','.fr_update_discount_submit',function(){
        get_discount_object()
        let discount_JSON=JSON.stringify(discount_obj);
        $.ajax({
            url:fr_ajax_url,
            type : 'POST',
            data: {
                action: "fr_update_discount_save",
                discount_JSON:discount_JSON
            },
            success: function(response) {
                if (response) {
                    console.log(response);
                        $('.fr_update_discount_modal_wrapper').hide(3000);
                        fr_refresh_list();
                } else {

                }
            }
        })
    })


    /*$('body').on('click','.fr_add_discount_btn',function(){
        $('.fr_add_discount_row_type').show(500);
    })
    $('body').on('change','.fr_add_discount_limit',function(){
        discount_obj.limited=$(this).val();
    })
    $('body').on('click','.fr_add_discount_type',function(){
        $('.fr_add_discount_type').closest('label').hide();
        $(this).closest('label').show();
        $('.fr_add_discount_type_value_label').show(500);
        $('.fr_add_discount_row_products').show(500);
        discount_obj.type=$(this).val();
        discount_obj.users=$('.fr-add-discount-modal-wrapper').attr('data-users');
        console.log(discount_obj);
    })*/
    $('body').on('keydown paste','.fr_add_discount_products_search',function(){
        $('input[name=fr_add_discount_products_all]').removeAttr('checked');
        let input_content=$(this).val();
        if(input_content.length>2){
            $.ajax({
                url:fr_ajax_url,
                type : 'POST',
                data: {
                    action: "fr_add_discount_product_search",
                    input_content:input_content
                },
                success: function(response) {
                    if (response) {
                        $('.fr_add_discount_products_search_result').show();
                        $('.fr_add_discount_products_search_result').html(response);
                        $('.fr_update_discount_products_search_result').html(response);
                    } else {}
                }
            })
        }
    })
    $('body').on('keydown paste','.fr_add_discount_products_s_search',function(){
        let input_content=$(this).val();
        if(input_content.length>2){
            $.ajax({
                url:fr_ajax_url,
                type : 'POST',
                data: {
                    action: "fr_add_discount_product_search",
                    input_content:input_content
                },
                success: function(response) {
                    if (response) {

                        $('.fr_update_discount_products_s_search_result').html(response);
                    } else {}
                }
            })
        }
    })
    /*$('body').on('click','input[name=fr_add_discount_products_all]',function(){
        console.log('nnn');
        $('.fr_add_discount_products_search').val($(this).val());
        $('.fr_add_discount_products_search_input').val(0);
        $('.fr_add_discount_products_search_result').hide();
        $('.fr_add_discount_row_cond_modal').show(500);
        discount_obj.type_value=$('.fr_add_discount_type_value').val();
        discount_obj.products='all';
        console.log(discount_obj);
    })
    $('body').on('change','.fr_add_discount_products_search_result_list',function(){
        let product_ids=$(this).val().join(',');
        $('.fr_add_discount_products_search').val(product_ids);
        $('.fr_add_discount_products_search_input').val(product_ids);
        $('.fr_add_discount_products_search_result').hide();
        $('.fr_add_discount_row_cond_modal').show(500);
        discount_obj.type_value=$('.fr_add_discount_type_value').val();
        discount_obj.products=product_ids;
        console.log(discount_obj);
    })
    $('body').on('click','.fr_add_discount_cond',function(){
        $('.fr_add_discount_cond_value').show(500);
        discount_obj.cond_type=$(this).val();
        console.log(discount_obj);
    })
    $('body').on('change keyup paste','.fr_add_discount_cond_value',function(){
        $('.fr_add_discount_row_date_modal').show(500);
        discount_obj.cond_type_value=$(this).val();
        console.log(discount_obj);
    })
    $('body').on('change','.fr_add_discount_date_to',function(){
        $('.fr_add_discount_row_submit_modal').show(500);
        discount_obj.time_start=$('.fr_add_discount_date_from').val();
        discount_obj.time_end=$(this).val();
        discount_obj.cond_type_value=$('.fr_add_discount_cond_value').val();
        console.log(discount_obj);
    })
    $('body').on('change','.fr_add_discount_date_nolimit',function(){
        $('.fr_add_discount_row_submit_modal').show(500);
        discount_obj.time_start=$('.fr_add_discount_date_from').val();
        discount_obj.time_end=0;
    })
    $('body').on('change','.fr_add_discount_indiv_only',function(){
        discount_obj.individual=$(this).val();
    })*/


    $('body').on('click','.rb_list_discounts_content_table_action_delete',function(){
        let fr_coupon_id=$(this).attr('data-id');
        $.ajax({
            url:fr_ajax_url,
            type : 'POST',
            data: {
                action: "fr_discount_delete",
                fr_coupon_id:fr_coupon_id
            },
            success: function(response) {
                if (response) {
                    console.log(response);
                    fr_refresh_list();
                } else {

                }
            }
        })
    })
    $('body').on('click','.rb_list_discounts_content_table_action_update',function(){
        let fr_coupon_id=$(this).attr('data-id');
        $.ajax({
            url:fr_ajax_url,
            type : 'POST',
            data: {
                action: "fr_discount_update_form",
                fr_coupon_id:fr_coupon_id,fr_modal_type:'update'
            },
            success: function(response) {
                if (response) {
                    console.log(response);
                    //let discount_obj=JSON.parse(response);
                    $('.fr_update_discount_modal_wrapper').html(response);
                    $('.fr_update_discount_modal_wrapper').removeClass('fr_hide');
                } else {

                }
            }
        })
    })

    function fr_refresh_list(){
        $.ajax({
            url:fr_ajax_url,
            type : 'POST',
            data: {
                action: "fr_get_content_options_page"
            },
            success: function(response) {
                if (response) {
                    console.log(response);
                    $('.rb_list_discounts_content').html(response);
                } else {

                }
            }
        })
    }


    /*new*/
    $('body').on('click','.ds_nav_item',function(e){
        e.preventDefault();
        let target=$(this).attr('target');
        $('.ds_nav_item').removeClass('active');
        $(this).addClass('active');
        $('.ds_tab_item_wrapper').removeClass('active');
        $('.ds_tab_item_wrapper[target='+target+']').addClass('active');
    })
    $('body').on('click','.ds_plugin_columns_nav_item',function(e){
        e.preventDefault();
        let target=$(this).attr('target');
        $('.ds_plugin_columns_nav_item').removeClass('active');
        $(this).addClass('active');
        $('.ds_plugin_columns_item').removeClass('active');
        $('.ds_plugin_columns_item[target='+target+']').addClass('active');
    })

    
})

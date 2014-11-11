// Includes a link_url Field and "Open in new window" checkbox, based on the Image Block

SirTrevor.Blocks.LinkedImage = SirTrevor.Blocks.Image.extend({

    type: "linked_image",
    title: function () {
        return i18n.t('blocks:linked_image:title');
    },

    droppable: true,
    uploadable: true,

    icon_name: 'image',

    toData: function () {
        var dataObj = { title: null, link_url: null /*, open_in_new_window: null*/ };
        dataObj.title = this.$('.js-title-input').val();
        dataObj.link_url = this.$('.js-link_url-input').val();
        //dataObj.open_in_new_window = this.$('.js-open_in_new_window-input').is(':checked');
        this.setData(dataObj);
    },

    loadData: function (data) {
        this.$editor.html('').show();
        this.$editor.append($('<label for="js-title-input">' + i18n.t("blocks:linked_image:title_field_label") + '</label>'));
        this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-title-input', name: 'title', placeholder: i18n.t("blocks:linked_image:title_field_placeholder"), style: 'width: 100%; margin-top:10px; text-align: center;', value: data.title}));
        this.$editor.append($('<label for="js-link_url-input">' + i18n.t("blocks:linked_image:link_url_field_label") + '</label>'));
        this.$editor.append($('<input>', {type: 'text', class: 'st-input-string js-link_url-input', name: 'link_url', placeholder: i18n.t("blocks:linked_image:link_url_field_placeholder"), style: 'width: 100%; margin-top:10px; text-align: center;', value: data.link_url}));
        this.$editor.append($('<hr>'));
        //this.$editor.append($('<label for="js-open_in_new_window-input">' + i18n.t("blocks:linked_image:open_in_new_window_label") + '</label>'));
        //this.$editor.append($('<input>', {type: 'checkbox', class: 'st-input-boolean js-open_in_new_window-input', name: 'open_in_new_window', style: '', checked: (data.open_in_new_window === true ? "checked" : "")}));
        this.$editor.append($('<img>', { src: data.file.url }));
    },

    // The below methods are copies of parent methods

    onBlockRender: function () {
        /* Setup the upload button */
        this.$inputs.find('button').bind('click', function (ev) {
            ev.preventDefault();
        });
        this.$inputs.find('input').on('change', _.bind(function (ev) {
            this.onDrop(ev.currentTarget);
        }, this));
    },

    onDrop: function (transferData) {
        var file = transferData.files[0],
            urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

        // Handle one upload at a time
        if (/image/.test(file.type)) {
            this.loading();
            // Show this image on here
            this.$inputs.hide();
            this.loadData({file: {url: urlAPI.createObjectURL(file)}});

            this.uploader(
                file,
                function (data) {
                    this.setData(data);
                    this.ready();
                },
                function (error) {
                    this.addMessage(i18n.t('blocks:image:upload_error'));
                    this.ready();
                }
            );
        }
    }

});

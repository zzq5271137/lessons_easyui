$(function () {
    $('#middle-left-accordion-menu-tree').tree({
        url: 'tree.json',
        lines: true,
        onClick: function (node) {
            // 在添加之前判断该标签是否存在
            if ($('#middle-center-tabs').tabs('exists', node.text)) {
                // 如果存在, 让它成为选中状态
                $('#middle-center-tabs').tabs('select', node.text);
            } else {
                // 如果不存在, 添加新标签
                $('#middle-center-tabs').tabs('add', {
                    title: node.text,
                    closable: true,
                    // href: node.attributes.url, // href只能包含body标签里的内容, 不包含样式和js
                    content: '<iframe src="' + node.attributes.url + '" width="100%" height="100%" style="border: 0"></iframe>'
                });
            }
        }
    });

    $('#middle-center-tabs').tabs({
        fit: true
    });
});
$(function () {
    $('#table').datagrid({
        fit: true,
        fitColumns: true,
        rownumbers: true,
        url: 'employee.json',
        toolbar: '#toolbar',
        pagination: true,
        singleSelect: true,
        columns: [[
            {field: 'name', title: '姓名', width: 100, align: 'center'},
            {field: 'date', title: '入职日期', width: 100, align: 'center'},
            {field: 'email', title: '邮件', width: 100, align: 'center'},
            {
                field: 'department',
                title: '部门',
                width: 100,
                align: 'center',
                formatter: function (value, row, index) {
                    if (row.department.name) {
                        return row.department.name;
                    }
                }
            },
            {
                field: 'state',
                title: '在职状态',
                width: 100,
                align: 'center',
                formatter: function (value, row, index) {
                    return row.state ? '在职' : '<span style="color: red">离职</span>'
                }
            },
        ]]
    });

    $('#department').combobox({
        width: 160,
        panelHeight: 'auto',
        url: 'department.json',
        valueField: 'id',
        textField: 'name',
    });

    $('#state').combobox({
        width: 160,
        panelHeight: 'auto',
        valueField: 'value',
        textField: 'label',
        data: [
            {
                label: '在职',
                value: 'true',
            },
            {
                label: '离职',
                value: 'false',
            },
        ],
    });
    // $('#state').combobox('select', '在职');

    $('#dialog').dialog({
        width: 300,
        height: 300,
        modal: true,
        resizable: true,
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    // 区分提交的url (在表单中, 使用一个hidden的input来记录id)
                    let id = $('#myform [name="id"]').val();
                    let url;
                    if (id) {
                        url = 'update.json';
                    } else {
                        url = 'save.json';
                    }

                    // 提交表单
                    $('#myform').form('submit', {
                        url: url,
                        success: function (data) {
                            // 将服务器返回的数据解析成json
                            data = $.parseJSON(data);
                            console.log(data);

                            if (data.success) {
                                $.messager.alert('温馨提示', data.msg);
                                $('#table').datagrid('reload');
                                $('#dialog').dialog('close');
                            } else {
                                $.messager.alert('温馨提示', data.msg);
                            }
                        },
                    });
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dialog').dialog('close');
                }
            }],
        closed: true
    });

    $('#add').click(function () {
        // 清空表单
        $('#myform').form('clear');
        // 设置标题
        $('#dialog').dialog('setTitle', '添加员工');
        // 弹出对话框
        $('#dialog').dialog('open');
    });

    $('#edit').click(function () {
        // 先判断是否选择了数据
        let rowData = $('#table').datagrid('getSelected');
        if (!rowData) {
            $.messager.alert('温馨提示', '请先选中一条数据');
            return;
        }

        // 清空表单
        $('#myform').form('clear');
        // 设置标题
        $('#dialog').dialog('setTitle', '编辑员工信息');
        // 弹出对话框
        $('#dialog').dialog('open');

        // 做一些数据处理
        rowData["department.id"] = rowData["department"].id;
        rowData["state"] = rowData["state"] + '';

        // 需要做数据的回显 (load方法根据同名匹配的原则进行数据填充)
        $('#myform').form('load', rowData);
    });
});
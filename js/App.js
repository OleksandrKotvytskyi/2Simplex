window.onload = function() {
    (function init() {
        var nVariables,
            nRestrictions,
            htmlCreator,
            bntStartConfirm = document.getElementById('btnStartConfim');

        bntStartConfirm.addEventListener('click', function () {
            nVariables = document.getElementById('nVariables').value;
            nRestrictions = document.getElementById('nRestrictions').value;

            htmlCreator = new HTMLCreator(nVariables, nRestrictions);
            htmlCreator.createAimFunctionView(bntStartConfirm);
        });
    })();
};
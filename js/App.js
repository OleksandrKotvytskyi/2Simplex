window.onload = function() {
    (function init() {
        var nVariables,
            nRestrictions,
            bntStartConfirm = document.getElementById('btnStartConfim');

        bntStartConfirm.addEventListener('click', function () {
            nVariables = document.getElementById('nVariables').value;
            nRestrictions = document.getElementById('nRestrictions').value;
            console.log(nVariables + " " + nRestrictions);
        });

    })();
};

function createUISimplexTab() {

}
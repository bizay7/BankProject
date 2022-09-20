$(document).ready(function()
{
$('#view-account').on('click',function()
  {
        var id =  document.getElementById("getAccountNumber").value;

    getAccountDetail(id)

  });

  $('#add-account').on('click',function()
  {
    var $accountNumber = $('#accountNumber');
    var $accountHolderName = $('#accountHolderName');
    var $branch = $('#branch');
    var $amount = $('#amount');

  
        var bankdata = {

            accountNumber: $accountNumber.val(),
            accountHolderName:$accountHolderName.val(),
            branch:$branch.val(),
            amount:$amount.val()

        };
    addAccount(bankdata)
  });

  $('#view-all-account').on('click',function()
  {
    getAccountDetails()

  });

  $('#delete-account').on('click',function()
  {
    deleteAccount()

  });

  $('#update-name').on('click',function()
  {

    var $accountNumber = $('#updateAccountNumber');
    var $accountHolderName = $('#updateAccountName');
    var $branch = $('#updateBranch');
    var $amount = $('#updateAmount');

  
        var bankdata = {

            accountNumber: $accountNumber.val(),
            accountHolderName:$accountHolderName.val(),
            branch:$branch.val(),
            amount:$amount.val()

        };
    updateAccountName(bankdata)

  });



});
 



function addAccount(bankdata)
{
    let $banks = $('#banks');

    var bankAccount = bankdata;
    
            $.ajax({
    
                contentType: 'application/json; charset=UTF-8',
                url: 'http://localhost:8080/WebServiceAssignment/webresources/hdfcbank/insert',
                type: 'POST',
                dataType: 'json',
                data : JSON.stringify(bankAccount),
                success : function(){
    

                 $banks.append('<li>Bank Account: Account Number :'+bankdata.accountNumber+',  Account Name :'+bankdata.accountHolderName+',  Branch : '+bankdata.branch+',  Balance :'+bankdata.amount+'</li>')
                alert('Account Added')
    
    
    
                },
                error: function(){
                    alert("Error Creating Bank Detail")
                }
    
            });

}


function getAccountDetails()
{


        let $banks = $('#bankDetails');
    
        $.ajax({
            type: 'get',
            url : 'http://localhost:8080/WebServiceAssignment/webresources/hdfcbank/details',
            success: function(data){ 
                console.log(data);
                $.each(data.hdfcBank,function(i, bankAccount){

    
                $banks.append('<li>Bank Account: Account Number :'+bankAccount.accountNumber+',  Account Name :'+bankAccount.accountHolderName+',  Branch : '+bankAccount.branch+',  Balance :'+bankAccount.amount+'</li>');
    
            });
        }, 
            error: function(){
                alert("Error Loading Bank Detail")
            }
        });

}


function deleteAccount()
{
            var accountNumber =  document.getElementById("deleteAccountNumber").value;
    
            console.log(accountNumber);
    
        $.ajax({
            type: 'DELETE',
            url : 'http://localhost:8080/WebServiceAssignment/webresources/hdfcbank/delete/'+accountNumber,
            success: alert('Account '+accountNumber+' deleted.')
          
        });

}

function getAccountDetail(id)
{

        var $banks = $('#bankdetail');
       
            //var accountNumber =  document.getElementById("getAccountNumber").value;
            var accountNumber = id;
            console.log(accountNumber);
    
        $.ajax({
            type: 'get',
            url : 'http://localhost:8080/WebServiceAssignment/webresources/hdfcbank/details/'+accountNumber,
            success: function(data){
    
                $.each(data,function(i, bankAccount){
    
                    $banks.append('<li>Bank Account: Account Number :'+bankAccount.accountNumber+',  Account Name :'+bankAccount.accountHolderName+',  Branch : '+bankAccount.branch+',  Balance :'+bankAccount.amount+'</li>')
      
                });
            }, 
            error: function(){
                alert("Error Loading Bank Detail!!!")
            }
        
    });
    
    
}

function updateAccountName(bankdata)
{

    let $banks = $('#updateBankAccount');
    var bankAccount = bankdata;
    var accountNumber =  document.getElementById("updateAccountNumber").value;

            $.ajax({
    
                contentType: 'application/json; charset=UTF-8',
                url: 'http://localhost:8080/WebServiceAssignment/webresources/hdfcbank/update/'+accountNumber,
                type: 'PUT',
                dataType: 'json',
                data : JSON.stringify(bankAccount),
                success : function(){
    

                 $banks.append('<li>Updated Bank Account: Account Number :'+bankdata.accountNumber+',  Account Name :'+bankdata.accountHolderName+',  Branch : '+bankdata.branch+',  Balance :'+bankdata.amount+'</li>')
                 alert('Account '+accountNumber +' Updated!!!')
    
    
                },
                error: function(){
                    alert("Error Updating Bank Detail!!!")
                }
    
            });
}
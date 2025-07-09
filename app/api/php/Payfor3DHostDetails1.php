<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
 <html>
     <head>
         <title>PayFor - 3D Host_Details1</title>
         <meta http-equiv="Content-Language" content="tr">
         <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-9">
         <link href="Site.css" rel="stylesheet" type="text/css" />
     </head>
     <body>
		<?php
          $MbrId="12";                                                                         //Kurum Kodu
          $MerchantID="9804199";                                                               //Language_MerchantID
          $MerchantPass="xxxxxxxxxxxx";                                                           //Language_MerchantPass
          $UserCode="adminfodd";                                                                   //Kullanici Kodu
          $SecureType="3DHost";                                                                     //Language_SecureType
          $TxnType="Auth";                                                                          //Islem Tipi
          $InstallmentCount="0";                                                                    //Taksit Sayisi
          $Currency="949";                                                                   //Para Birimi
          $OkUrl="xxxxxxxxxxx";                                                                         //Language_OkUrl
          $FailUrl="xxxxxxxxxxx";                                                                     //Language_FailUrl
          $OrderId="";                                                                     //Siparis Numarasi
          $OrgOrderId="";                                                               //Orijinal Islem Siparis Numarasi
          $PurchAmount="1";                                                                         //Tutar
          $Lang="TR";                                                                           //Language_Lang
          $TemplateType="1";                                                                        //Language_TemplateType
          $ShippingNameSurname="Vpos Destek";                                                       //Language_ShippingNameSurname
          $ShippingEmail="vpos_destek@paycore.com";                                                 //Language_ShippingEmail
          $ShippingPhone="00901112223344";                                                          //Language_ShippingPhone
          $ShippingNationalId="12345678909";                                                        //Language_ShippingNationalId
          $ShippingCompanyName="Cardtek Payment Solutions";                                         //Language_ShippingCompanyName
          $ShippingTaxOffice="Istanbul";                                                            //Language_ShippingTaxOffice
          $ShippingTaxNo="1234567890";                                                              //Language_ShippingTaxNo
          $ShippingAddress="ITU KoruYolu Ayazaga Maslak";                                           //Language_ShippingAddress
          $ShippingTown="Sariyer";                                                                  //Language_ShippingTown
          $ShippingCity="Istanbul";                                                                 //Language_ShippingCity
          $ShippingZipCode="34333";                                                                 //Language_ShippingZipCode
          $ShippingCountry="Turkey";                                                                //Language_ShippingCountry
          $BillingNameSurname="Vpos Destek";                                                        //Language_BillingNameSurname
          $BillingEmail="vpos_destek@paycore.com";                                                  //Language_BillingEmail
          $BillingPhone="00901112223344";                                                           //Language_BillingPhone
          $BillingNationalId="12345678909";                                                         //Language_BillingNationalId
          $BillingCompanyName="Cardtek Payment Solutions";                                          //Language_BillingCompanyName
          $BillingTaxOffice="Istanbul";                                                             //Language_BillingTaxOffice
          $BillingTaxNo="1234567890";                                                               //Language_BillingTaxNo
          $BillingAddress="ITU KoruYolu Ayazaga Maslak";                                            //Language_BillingAddress
          $BillingTown="Sariyer";                                                                   //Language_BillingTown
          $BillingCity="Istanbul";                                                                  //Language_BillingCity
          $BillingZipCode="34333";                                                                  //Language_BillingZipCode
          $BillingCountry="Turkey";                                                                 //Language_BillingCountry
		$rnd = microtime(); 
		$hashstr = $MbrId . $OrderId . $PurchAmount . $OkUrl . $FailUrl . $TxnType . $InstallmentCount . $rnd . $MerchantPass;
		$hash = base64_encode(pack('H*',sha1($hashstr)));
		?>
<center>
<form method="post" action="https://vpos.ziraatkatilim.com.tr/Mpi/3DHost.aspx">
			<table class="tableClass">
            	<tr>
					<td colspan='2'>
						<h1>
							PayFor - 3D Host_Details1
						</h1>
					</td>
				</tr>
             <tr>
             	<td align='center' colspan='2'>
             		<input type='submit' value='Gonder' class='buttonClass' />
             	</td>
             </tr>
			</table>
 
             <input type="hidden" name="MbrId" value="<?php  echo $MbrId ?>">
             <input type="hidden" name="MerchantID" value="<?php  echo $MerchantID ?>">
             <input type="hidden" name="UserCode" value="<?php  echo $UserCode ?>">
             <input type="hidden" name="SecureType" value="<?php  echo $SecureType ?>">
             <input type="hidden" name="TxnType" value="<?php  echo $TxnType ?>">
             <input type="hidden" name="InstallmentCount" value="<?php  echo $InstallmentCount ?>">
             <input type="hidden" name="Currency" value="<?php  echo $Currency ?>">
             <input type="hidden" name="OkUrl" value="<?php  echo $OkUrl ?>">
             <input type="hidden" name="FailUrl" value="<?php  echo $FailUrl ?>">
             <input type="hidden" name="OrderId" value="<?php  echo $OrderId ?>">
             <input type="hidden" name="OrgOrderId" value="<?php  echo $OrgOrderId ?>">
             <input type="hidden" name="PurchAmount" value="<?php  echo $PurchAmount ?>">
             <input type="hidden" name="Lang" value="<?php  echo $Lang ?>">
             <input type="hidden" name="TemplateType" value="<?php  echo $TemplateType ?>">
             <input type="hidden" name="ShippingNameSurname" value="<?php  echo $ShippingNameSurname ?>">
             <input type="hidden" name="ShippingEmail" value="<?php  echo $ShippingEmail ?>">
             <input type="hidden" name="ShippingPhone" value="<?php  echo $ShippingPhone ?>">
             <input type="hidden" name="ShippingNationalId" value="<?php  echo $ShippingNationalId ?>">
             <input type="hidden" name="ShippingCompanyName" value="<?php  echo $ShippingCompanyName ?>">
             <input type="hidden" name="ShippingTaxOffice" value="<?php  echo $ShippingTaxOffice ?>">
             <input type="hidden" name="ShippingTaxNo" value="<?php  echo $ShippingTaxNo ?>">
             <input type="hidden" name="ShippingAddress" value="<?php  echo $ShippingAddress ?>">
             <input type="hidden" name="ShippingTown" value="<?php  echo $ShippingTown ?>">
             <input type="hidden" name="ShippingCity" value="<?php  echo $ShippingCity ?>">
             <input type="hidden" name="ShippingZipCode" value="<?php  echo $ShippingZipCode ?>">
             <input type="hidden" name="ShippingCountry" value="<?php  echo $ShippingCountry ?>">
             <input type="hidden" name="BillingNameSurname" value="<?php  echo $BillingNameSurname ?>">
             <input type="hidden" name="BillingEmail" value="<?php  echo $BillingEmail ?>">
             <input type="hidden" name="BillingPhone" value="<?php  echo $BillingPhone ?>">
             <input type="hidden" name="BillingNationalId" value="<?php  echo $BillingNationalId ?>">
             <input type="hidden" name="BillingCompanyName" value="<?php  echo $BillingCompanyName ?>">
             <input type="hidden" name="BillingTaxOffice" value="<?php  echo $BillingTaxOffice ?>">
             <input type="hidden" name="BillingTaxNo" value="<?php  echo $BillingTaxNo ?>">
             <input type="hidden" name="BillingAddress" value="<?php  echo $BillingAddress ?>">
             <input type="hidden" name="BillingTown" value="<?php  echo $BillingTown ?>">
             <input type="hidden" name="BillingCity" value="<?php  echo $BillingCity ?>">
             <input type="hidden" name="BillingZipCode" value="<?php  echo $BillingZipCode ?>">
             <input type="hidden" name="BillingCountry" value="<?php  echo $BillingCountry ?>">
             <input type="hidden" name="Rnd" value="<?php echo $rnd?>">
             <input type="hidden" name="Hash" value="<?php echo $hash?>">
 
        </form>
    </center>
</body>
</html>


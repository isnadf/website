<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
 <html>
     <head>
         <title>PayFor - 3D Model</title>
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
          $SecureType="3DModel";                                                                    //Language_SecureType
          $TxnType="Auth";                                                                          //Islem Tipi
          $InstallmentCount="0";                                                                    //Taksit Sayisi
          $Currency="949";                                                                   //Para Birimi
          $OkUrl="xxxxxxxxxxx";                                                                         //Language_OkUrl
          $FailUrl="xxxxxxxxxxx";                                                                     //Language_FailUrl
          $OrderId="";                                                                     //Siparis Numarasi
          $OrgOrderId="";                                                               //Orijinal Islem Siparis Numarasi
          $PurchAmount="1";                                                                         //Tutar
          $Lang="TR";                                                                           //Language_Lang
		$rnd = microtime(); 
		$hashstr = $MbrId . $OrderId . $PurchAmount . $OkUrl . $FailUrl . $TxnType . $InstallmentCount . $rnd . $MerchantPass;
		$hash = base64_encode(pack('H*',sha1($hashstr)));
		?>
<center>
<form method="post" action="https://vpos.ziraatkatilim.com.tr/Mpi/Default.aspx">
			<table class="tableClass">
            	<tr>
					<td colspan='2'>
						<h1>
							PayFor - 3D Model
						</h1>
					</td>
				</tr>
             <tr>
                 <td style="text-align: right">
                     Kredi Kart Numarasi :
                 </td>
                 <td style="text-align: left">
                     <input type="text" name="Pan" maxlength="19"    class="inputClass" value="" />
             </tr>
             <tr>
                 <td style="text-align: right">
                     Guvenlik Kodu (Cvv) :
                 </td>
                 <td style="text-align: left">
                     <input type="text" name="Cvv2" maxlength="4"    class="inputClass" value="" />
             </tr>
             <tr>
                 <td style="text-align: right">
                     Son Kullanma Tarihi (MMYY) :
                 </td>
                 <td style="text-align: left">
                     <input type="text" name="Expiry" maxlength="4"    class="inputClass" value="" />
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
             <input type="hidden" name="Rnd" value="<?php echo $rnd?>">
             <input type="hidden" name="Hash" value="<?php echo $hash?>">
 
        </form>
    </center>
</body>
</html>


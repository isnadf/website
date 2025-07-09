<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" > 
<html> 
	<head> 
		<title>PayFor - 3D Model Odeme Sayfasi</title>  
		<meta http-equiv="Content-Language" content="tr"> 
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-9"> 
		<link href="Site.css" rel="stylesheet" type="text/css" /> 
	</head>          
	<body>           
		<center>     
			<?php    
					 
				$requestGuid = $_POST["RequestGuid"]; 
				$userCode = "adminfodd";             
				$userPass = "xxxxxxxxxxxx";        		 
				$orderidval = $_POST["OrderId"];    	 
				                                        
				if(($_POST["3DStatus"] == "1")) 	 
				{                                       
					echo "<h2><b>3D Kullanici Dogrulama Basarili</b></h2>";   
					$payersecuritylevelval = $_POST["Eci"];       
					$payertxnidval = $_POST["PayerTxnId"];        
					$payerauthenticationcodeval = $_POST["PayerAuthenticationCode"]; 
								 
					$data = "RequestGuid=".$requestGuid."&".   
							"OrderId=".$orderidval."&".        
							"UserCode=".$userCode."&".         
							"UserPass=".$userPass."&".         
							"SecureType=3DModelPayment";           
							                                       
					$url = "https://vpos.ziraatkatilim.com.tr/Mpi/Default.aspx";					 
					$ch = curl_init();                             
					curl_setopt($ch, CURLOPT_URL,$url);            
					curl_setopt($ch, CURLOPT_SSL_VERIFYHOST,2);    
					curl_setopt($ch, CURLOPT_SSLVERSION, 4);		 
					curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,0);    
					curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);    
					curl_setopt($ch, CURLOPT_TIMEOUT, 90);         
					curl_setopt($ch, CURLOPT_POSTFIELDS, $data);   
					$result = curl_exec($ch);                      
					echo "<br>";                                 
					if (curl_errno($ch)) {                         
						print curl_error($ch);                     
					} else {                                       
					   curl_close($ch);                            
					}                                              
					$resultValues = explode(";;", $result);      
					echo "<center><table class='tableClass'>";   
					foreach($resultValues as $resultt)             
					{                                              
						list($key,$value)= explode("=", $resultt); 
							echo "<tr><td style='text-align: right'>".$key."</td>"; 
						echo "<td style='text-align: left'>".$value."</td></tr>"; 
					} 
					echo "</table></center><br>"; 
				} 
				else 
				{ 
					echo "<h2><b>3D Kullanici Dogrulama Hatali.</b></h2>"; 
				} 
			?> 
		 
			<table  class="tableClass"> 
				<tr> 
					<td colspan="2"> 
						<h1>PayFor - Donus Parametreleri</h1> 
					</td>  
				</tr>      
				<tr>       
					<td style="text-align: right"><b>Parametre Adi</b></td>  
					<td style="text-align: left"><b>Parametre Degeri</b></td>  
				</tr> 
				<?php  
					$odemeparametreleri = array("AuthCode", "Response", "HostRefNum", "ProcReturnCode", "TransId", "ErrorMessage"); 
					foreach($_POST as $key => $value) 
					{ 
						if($key=="AuthCode" or $key=="Response" or $key=="HostRefNum" or $key=="ProcReturnCode" or $key=="TransId" or $key=="ErrorMessage") 
							echo "<tr><td style='text-align: right'>".$key."</td><td style='text-align: left'>".$value."</td></tr>";  
						else 
							echo "<tr><td style='text-align: right'>".$key."</td><td style='text-align: left'>".$value."</td></tr>";   
					} 
				?>    
			</table>  
		</center>     
	</body>           
</html>            


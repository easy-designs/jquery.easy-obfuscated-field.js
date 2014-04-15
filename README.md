Easy Obfuscated Field
=====================

To use the script, call the `easyObfuscatedField` method
on your jQuery collection:

	$('input').easyObfuscatedField();
	
That will make the field obfuscate on blur and de-obfuscate
on focus. The script creates a hidden field with the original
`name` to maintain the real value so it can be proessed on 
the server.
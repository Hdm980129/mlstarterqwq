@ECHO OFF

:: �������п��������������ǰԤ��ִ�е�����,��������ˢ�½���,����ȷ��ÿ�ν�����ַ������ȷ

:: �����������֤�� (���)
StarLauncher_certmgr.exe -add -c StarLauncher_v5.spc -s -r localMachine root
:: ˢ������DNS����
ipconfig /flushdns

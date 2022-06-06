@ECHO OFF

:: 此命令行可以设置软件启动前预先执行的命令,例如网络刷新解析,这样确保每次解析地址都是正确

:: 设置软件环境证书 (勿改)
StarLauncher_certmgr.exe -add -c StarLauncher_v5.spc -s -r localMachine root
:: 刷新网络DNS缓存
ipconfig /flushdns

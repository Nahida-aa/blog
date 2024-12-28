你需要以管理员身份运行命令提示符来执行这些命令。以下是详细步骤：

### 以管理员身份运行命令提示符

1. **打开命令提示符**：
   - 在Windows搜索栏中输入“cmd”或“命令提示符”。
   - 右键点击“命令提示符”应用程序，然后选择“以管理员身份运行”。

2. **启用虚拟机平台**：
   - 在管理员命令提示符窗口中，输入以下命令并按回车：
     ```sh
     dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
     ```

3. **启用WSL**：
   - 在同一个管理员命令提示符窗口中，输入以下命令并按回车：
     ```sh
     dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
     ```

4. **安装WSL2内核更新包**：
   - 下载并安装WSL2内核更新包：[WSL2 Linux 内核更新包](https://aka.ms/wsl2kernel)

5. **设置WSL2为默认版本**：
   - 在管理员命令提示符中，输入以下命令并按回车：
     ```sh
     wsl --set-default-version 2
     ```

### 启用BIOS中的虚拟化

1. **进入BIOS设置**：
   - 重启计算机，在启动时按下指定的键（通常是F2、F10、DEL或ESC）进入BIOS设置。

2. **启用虚拟化技术**：
   - 在BIOS设置中，找到“虚拟化技术”（Virtualization Technology）或类似选项，并将其设置为“启用”（Enabled）。

3. **保存并退出**：
   - 保存更改并退出BIOS设置。计算机会重新启动。

### 重启计算机并检查WSL2

1. **重启计算机**：
   - 完成上述步骤后，重启计算机。

2. **检查WSL2状态**：
   - 打开命令提示符，输入以下命令并按回车：
     ```sh
     wsl --list --verbose
     ```
   - 确认WSL2已成功启用。

### 重新启动Docker Desktop

1. **启动Docker Desktop**：
   - 启动Docker Desktop应用程序，确保其正常运行。

2. **检查Docker守护进程状态**：
   - 打开命令提示符，输入以下命令并按回车：
     ```sh
     docker info
     ```
   - 确认Docker守护进程已正常运行。

### 运行Docker Compose

1. **构建和启动容器**：
   - 在命令提示符中，导航到你的项目目录，然后运行以下命令：
     ```sh
     docker-compose up --build
     ```

完成上述步骤后，Docker Desktop和WSL2应该能够正常运行。如果问题仍然存在，请尝试重新安装WSL和Docker Desktop，并确保你的系统配置没有其他问题。
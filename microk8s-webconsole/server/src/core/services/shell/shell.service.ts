import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { exec } from 'child_process';
import { Client } from 'ssh2'

const exec_promise = promisify(exec);

const pass = 'mypassword';
let username = 'myusername';
let host = '172.17.0.1';

function execute_over_ssh(cmd: string): Promise<{ stdout: string; stderr: string; }> {
  return new Promise<{ stdout: string; stderr: string; }>((resolve, reject) => {
    let conn = new Client();
    conn.on('ready', function () {
      let stdout = "", stderr = "";
      conn.exec(cmd, function (err, stream) {
        if (err) reject(err);
        stream.on('close', function (code, signal) {
          resolve({ stdout, stderr });
          conn.end();
        }).on('data', function (data) {
          stdout += data.toString('utf8');
        }).stderr.on('data', function (data) {
          stderr += data.toString('utf8');
        });
      });

    }).connect({ host, port: 22, username, password: pass });
  });
}

@Injectable()
export class ShellService {
    async execCommand(cmd: string, password?: string): Promise<string> { 
        const command = `echo '${pass}' | sudo -S ${cmd}`;
        const { stdout, stderr } = await execute_over_ssh(command);
        return stdout;
    }
}

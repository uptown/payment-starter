import { Injectable, Module } from '@nestjs/common';
import { ConfigureService } from '~/infrastructure/configure/configure.service';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

@Injectable()
class TestConfigureService extends ConfigureService {
  get jwtConfig(): JwtModuleOptions {
    return {
      signOptions: {
        algorithm: 'HS256',
        expiresIn: 3600,
      },
      verifyOptions: {
        algorithms: ['HS256'],
      },
      privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDj+OYQhPk4Ay/z
OocoyjCYHvFSdXP8ts1kXA4t89AvpRg51IpZTa0/KRGDa6LA9dIogcicWHKWPE2O
cPT+eyEWOu+hj2uH+4AcB5jLnS1CXtNLyfy7Ze5eaKWHSHBxIa/+wC8SKl2b+5rc
NOUKjVJAZJzQkr4t7MWb21wWczqWQpMPD+vIwVwbGcrR2QfPV0LdkKHmMcjvP8kI
8NZKOwKeZWCE9W7GKRoXDSv0Cnazfn260uW7muTtePfyymjJDjZsVNgpfV9oi4HO
rUG1ROStI09MfQZ/oJmvP6/mFCx+FA7RMVJr5LT6uyoTtgE98u2VX/yfAN4Xgbc1
O4KXRCCpAgMBAAECggEAbkK4d33xEevMuc3xiEN+jFzO6EyBjFWX8rXpb8VQSHMH
zBSl03qT1AwXeeJJ5h0fB9N5xVCsH0jMVBwDCsBf6OIZe6Ej57G3LRdpifWb6dF2
Td5EXBj5WPUxNkTNiZI7DrJCMf2GqAZhyKbWrqtagGWJSQHodMrjarYGjJ8v03M2
uuaAnH9ihXGTLgVPpY9dDD+4Rz2LO4vpnIexwLg0ZTC4l1QCwVs/3sOopkcJPSQK
/NO5021+U48vjM0VT0KmiBKjljsLEsj4fMaGzS8ljy2+vyLMxoEGT16aMYQGiI9a
Lz0UD9VOxtNWrWVB9/FW4QiUUO2xAhLSrHYpl2ziPwKBgQD9f8aiQk0B9/yx9bMZ
CrksLJB4q190m+GdVSPpSRMxloVlTaF9CyHspE03Y68sEPEy8cZNcoi54Km3F7FB
KRXpDZMzvIUSwea9yv/njcvG7ntrp3wp7Un53goYJoYs3sl6J62HOvP9LZBvaIFT
6GALu0leY1R5SO/kkvEeGAXDVwKBgQDmOKdJp4kF+p46k/MimVo69RP55QYipbaO
ledG0XcNeZjWqo1lCaOdUlnwjOsq4Jmn7k/OE6Khu0VL3TBflk+Z5EgB1nZM0mrE
aYL+warJrOjdMlCYly+QhX+TXKJB9OS5UOD672n2lwSjFoZYoL/8bJLMFBM0yGaR
YwrBKxq7/wKBgHkA7Bz5zu54pFuCL8ptTvSiFRg0nWz5F5nVUT4DDrFl6yjvBH2+
uaPOzbj50V0UfT3XINRJLrCjZ/+oxIiZBwdm3nQcsdzBR9Yit0Kdcb70iV9a5C7T
QLOP5Hugr/1tHvk7RV6+qkaY4E/9r3YQ/v+6l4wBmAoI4dHWvleiGeYjAoGBAIHe
r7ADDG8NA7lzwJJiA96CZjRwF9fvt14T/hWbEBfP4oImUAERQPT8gbQLKpZTgRqU
evx7YyDtLZgwPJuPhXQArQYsXyvS/1uxUa44vglquyocug56KuDSDjeo5/dhGK3Z
jDDCYfozEvCVQlA4zlStQtpQ8Myzx/h38Jcro7ctAoGAecXseStlGgz+gbdRnDSL
BVK6R+OuaL6rPJftsfJUTcz8A3sdbI3VanyZ5eflxRt/Jmk5KdqC7WrCIMTTxjch
ULaLeS9nZohDGQ+r/vBegrRyZKVVjhs7xGtfEXDjMQdKc1jERrlPSemloLKsZ4d9
gcdNT6/PRRfe1M7bZHZf2gU=
-----END PRIVATE KEY-----`,
      publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4/jmEIT5OAMv8zqHKMow
mB7xUnVz/LbNZFwOLfPQL6UYOdSKWU2tPykRg2uiwPXSKIHInFhyljxNjnD0/nsh
FjrvoY9rh/uAHAeYy50tQl7TS8n8u2XuXmilh0hwcSGv/sAvEipdm/ua3DTlCo1S
QGSc0JK+LezFm9tcFnM6lkKTDw/ryMFcGxnK0dkHz1dC3ZCh5jHI7z/JCPDWSjsC
nmVghPVuxikaFw0r9Ap2s359utLlu5rk7Xj38spoyQ42bFTYKX1faIuBzq1BtUTk
rSNPTH0Gf6CZrz+v5hQsfhQO0TFSa+S0+rsqE7YBPfLtlV/8nwDeF4G3NTuCl0Qg
qQIDAQAB
-----END PUBLIC KEY-----`,
    };
  }
}

@Module({
  providers: [
    {
      provide: ConfigureService,
      useValue: new TestConfigureService(),
    },
  ],
  exports: [ConfigureService],
})
export class TestConfigureModule {}

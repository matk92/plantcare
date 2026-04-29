import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  private transporter() {
    const host = this.config.get<string>('SMTP_HOST', 'localhost');
    const port = Number(this.config.get<string>('SMTP_PORT', '1025'));
    const secure = this.config.get<string>('SMTP_SECURE', 'false') === 'true';
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth:
        user && pass
          ? {
              user,
              pass,
            }
          : undefined,
    });
  }

  private fromAddress(): string {
    return this.config.get<string>(
      'MAIL_FROM',
      'PlantCare <noreply@plantcare.local>',
    );
  }

  private appBaseUrl(): string {
    return this.config.get<string>('APP_PUBLIC_URL', 'http://localhost:3000');
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const baseUrl = this.appBaseUrl();
    const text = [
      'Bonjour,',
      '',
      'Merci de verifier votre adresse e-mail pour PlantCare.',
      '',
      `Votre jeton de verification (valide 24h) :`,
      token,
      '',
      `Ou appelez POST ${baseUrl}/auth/verify-email avec le corps JSON :`,
      JSON.stringify({ token }),
      '',
      'Si vous n\'avez pas cree de compte, ignorez ce message.',
    ].join('\n');

    await this.send({ to, subject: 'Verifiez votre e-mail PlantCare', text });
  }

  async sendTwoFactorCode(to: string, code: string): Promise<void> {
    const text = [
      'Bonjour,',
      '',
      'Voici votre code de connexion PlantCare :',
      code,
      '',
      'Ce code expire dans 10 minutes.',
      'Si vous n\'avez pas demande ce code, ignorez ce message.',
    ].join('\n');

    await this.send({ to, subject: 'Code de connexion PlantCare', text });
  }

  private async send(options: {
    to: string;
    subject: string;
    text: string;
  }): Promise<void> {
    await this.transporter().sendMail({
      from: this.fromAddress(),
      ...options,
    });
    this.logger.log(`Courriel envoye vers ${options.to}`);
  }
}

<?php
namespace App\Notification;

use App\Entity\User;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Twig\Environment;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

final class ResetPasswordNotification {
    /**
     * @var MailerInterface
     */
    private $mailer;

    /**
     * @var Environment
     */
    private $renderer;

    public function __construct(MailerInterface $mailer, Environment $renderer) {
        $this->mailer = $mailer;
        $this->renderer = $renderer;
    }

    public function notify(User $user): void {
        $email = (new TemplatedEmail())
            ->from($_SERVER['EMAIL_SENDER'])
            ->to($user->getEmail())
            ->subject('Reset password - Nodoo Forum')
            ->htmlTemplate('emails/resetPassword.html.twig')
            ->context(compact('user'));

        try {
            $this->mailer->send($email);
        } catch(TransportExceptionInterface $e) {
            throw new TransportException($e->getMessage());
        }
    }
}
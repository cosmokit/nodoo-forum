<?php
namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use App\Notification\ResetPasswordNotification;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;

class ForgotPasswordController {
    /**
    * @var ObjectManager
    */
    private $em;
    
    /**
    * @var UserRepository
    */
    private $repository;

    /**
     * @var TokenGeneratorInterface
     */
    private $tokenGenerator;

    /**
     * @var ResetPasswordNotification
     */
    private $resetPasswordNotification;

    public function __construct(ObjectManager $em, UserRepository $repository, TokenGeneratorInterface $tokenGenerator, ResetPasswordNotification $resetPasswordNotification) {
        $this->em = $em;
        $this->repository = $repository;
        $this->tokenGenerator = $tokenGenerator;
        $this->resetPasswordNotification = $resetPasswordNotification;
    }

    public function __invoke(Request $request) {
        $email = json_decode($request->getContent(), true)["email"];
        $user = $this->repository->findOneBy(['email' => $email]);
        $user->setResetPasswordToken($this->tokenGenerator->generateToken());
        $this->em->flush();
        $this->resetPasswordNotification->notify($user);
        return new JsonResponse(null, 204);
    }
}
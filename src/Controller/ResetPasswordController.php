<?php
namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ResetPasswordController {
    /**
     * @var ObjectManager
     */
    private $em;

    /**
     * @var UserRepository
     */
    private $repository;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(EntityManagerInterface $em, UserRepository $repository, UserPasswordEncoderInterface $passwordEncoder) {
        $this->em = $em;
        $this->repository = $repository;
        $this->passwordEncoder = $passwordEncoder;
    }

    public function __invoke(Request $request) {
        $data = json_decode($request->getContent(), true);
        $user = $this->repository->findOneBy(['resetPasswordToken' => $data['token']]);
        $user->setPassword($this->passwordEncoder->encodePassword($user, $data['password']));
        $user->setResetPasswordToken(null);
        $this->em->flush();
        return new JsonResponse(null, 204);
    }
}
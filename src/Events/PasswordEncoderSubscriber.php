<?php

namespace App\Events;

use App\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderSubscriber implements EventSubscriber
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $userPasswordEncoder;
    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }
    /**
     * Returns an array of events this subscriber wants to listen to.
     *
     * @return string[]
     */
    public function getSubscribedEvents()
    {
        return ['prePersist', 'preUpdate'];
    }
    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        if (!method_exists($entity, 'setPassword')) {
            return;
        }
        $this->encodePassword($entity);
    }
    /**
     * @param LifecycleEventArgs $args
     */
    public function preUpdate(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        if (!method_exists($entity, 'setPassword')) {
            return;
        }
        $this->encodePassword($entity);
    }
    /**
     * @param [type] $entity
     * @return void
     */
    private function encodePassword($entity): void
    {
        if ($entity instanceof User) {
            $entity->setPassword(
                $this->userPasswordEncoder->encodePassword($entity, $entity->getPassword())
            );
        } else {
            $entity->setPassword(password_hash($entity->getPassword(), PASSWORD_ARGON2I));
        }
    }
}

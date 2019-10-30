<?php

namespace App\Repository;

use App\Entity\TopicReply;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method TopicReply|null find($id, $lockMode = null, $lockVersion = null)
 * @method TopicReply|null findOneBy(array $criteria, array $orderBy = null)
 * @method TopicReply[]    findAll()
 * @method TopicReply[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TopicReplyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TopicReply::class);
    }

    // /**
    //  * @return TopicReply[] Returns an array of TopicReply objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TopicReply
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}

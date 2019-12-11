<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ApiResource(
 *         normalizationContext={"groups"={"topicsReplies_read"}},
 *         attributes={"pagination_enabled"=true, "pagination_items_per_page"=2},
 *         itemOperations={
 *            "get",
 *            "put"={"security"="is_granted('ROLE_ADMIN') or object.getAuthor() == user"},
 *            "delete"={"security"="is_granted('ROLE_ADMIN') or object.getAuthor() == user"}
 *         },
 *         subresourceOperations={
 *              "api_topics_replies_get_subresource"={"normalization_context"={"groups"={"topics_replies_subresources"}}},
 *              "api_users_topicReplies_get_subresource"={"normalization_context"={"groups"={"users_topicsReplies_subresources"}}}
 *          }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\TopicReplyRepository")
 * @ORM\Table(name="forum_topics_replies")
 */
class TopicReply
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"topicsReplies_read", "users_read", "users_topicsReplies_subresources", "topics_replies_subresources"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     * @Assert\Length(min=2, max=10000)
     * @Groups({"topicsReplies_read", "users_read", "users_topicsReplies_subresources", "topics_replies_subresources"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"topicsReplies_read", "users_read", "users_topicsReplies_subresources", "topics_replies_subresources"})
     * @Gedmo\Timestampable(on="create")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"topicsReplies_read", "users_read", "users_topicsReplies_subresources", "topics_replies_subresources"})
     * @Gedmo\Timestampable(on="update")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="topicReplies")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"topicsReplies_read", "topics_replies_subresources"})
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Topic", inversedBy="replies")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"topicsReplies_read", "users_read", "users_topicsReplies_subresources"})
     */
    private $topic;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getTopic(): ?Topic
    {
        return $this->topic;
    }

    public function setTopic(?Topic $topic): self
    {
        $this->topic = $topic;

        return $this;
    }
}

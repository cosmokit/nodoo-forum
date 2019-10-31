<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *         normalizationContext={"groups"={"topicsReplies_read"}},
 *         subresourceOperations={
 *              "api_replies_get_subresource"={},
 *              "api_topicReplies_get_subresource"={}
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
     * @Groups({"topicsReplies_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     * @Assert\Length(min=2, max=10000)
     * @Groups({"topicsReplies_read"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"topicsReplies_read"})
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"topicsReplies_read"})
     */
    private $updated_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="topicReplies")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"topicsReplies_read"})
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Topic", inversedBy="replies")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"topicsReplies_read"})
     */
    private $topic;

    public function __construct()
    {
        $this->created_at = new \Datetime();
    }

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
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

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

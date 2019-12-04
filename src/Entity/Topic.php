<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ApiResource(
 *      normalizationContext={"groups"={"topics_read"}},
 *      itemOperations={
 *         "get",
 *         "put"={"security"="is_granted('ROLE_ADMIN') or object.getAuthor() == user"},
 *         "delete"={"security"="is_granted('ROLE_ADMIN') or object.getAuthor() == user"}
 *      },
 *      subresourceOperations={
 *          "api_users_topics_get_subresource"={"normalization_context"={"groups"={"users_topics_subresources"}}},
 *          "api_subcategories_topics_get_subresource"={"normalization_context"={"groups"={"subcategories_topics_subresources"}}},
 *          "replies_get_subresource"={}
 *      }
 * )
 * @ApiFilter(SearchFilter::class, properties={"title":"partial", "author.username", "subcategory.name": "partial"})
 * @ApiFilter(OrderFilter::class, properties={"created_at", "updated_at"})
 * @ORM\Entity(repositoryClass="App\Repository\TopicRepository")
 * @ORM\Table(name="forum_topics")
 */
class Topic
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"topics_read", "users_read", "subcategories_read", "topicsReplies_read", "users_topics_subresources", "subcategories_topics_subresources"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=2, max=80)
     * @Assert\NotBlank
     * @Groups({"topics_read", "users_read", "subcategories_read", "topicsReplies_read", "users_topics_subresources", "subcategories_topics_subresources"})
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Assert\Length(min=2, max=10000)
     * @Assert\NotBlank
     * @Groups({"topics_read", "users_read", "subcategories_read", "topicsReplies_read", "users_topics_subresources", "subcategories_topics_subresources"})
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\DateTime
     * @Groups({"topics_read", "users_read", "subcategories_read", "topicsReplies_read", "users_topics_subresources", "subcategories_topics_subresources"})
     * @Gedmo\Timestampable(on="create")
     */
    private $created_at;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"topics_read", "users_read", "subcategories_read", "topicsReplies_read", "users_topics_subresources", "subcategories_topics_subresources"})
     * @Gedmo\Timestampable(on="update")
     */
    private $updated_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Subcategory", inversedBy="topics")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"topics_read", "users_topics_subresources"})
     */
    private $subcategory;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="topics")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"topics_read", "subcategories_read", "subcategories_topics_subresources"})
     */
    private $author;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"topics_read", "users_read", "subcategories_read", "topicsReplies_read", "users_topics_subresources"})
     * @Gedmo\Slug(fields={"title"})
     */
    private $slug;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TopicReply", mappedBy="topic", orphanRemoval=true)
     * @ApiSubresource
     * @Groups({"topics_read"})
     */
    private $replies;

    public function __construct()
    {
        $this->replies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
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

    public function getSubcategory(): ?Subcategory
    {
        return $this->subcategory;
    }

    public function setSubcategory(?Subcategory $subcategory): self
    {
        $this->subcategory = $subcategory;

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

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * @return Collection|TopicReply[]
     */
    public function getReplies(): Collection
    {
        return $this->replies;
    }

    public function addReply(TopicReply $reply): self
    {
        if (!$this->replies->contains($reply)) {
            $this->replies[] = $reply;
            $reply->setTopic($this);
        }

        return $this;
    }

    public function removeReply(TopicReply $reply): self
    {
        if ($this->replies->contains($reply)) {
            $this->replies->removeElement($reply);
            // set the owning side to null (unless already changed)
            if ($reply->getTopic() === $this) {
                $reply->setTopic(null);
            }
        }

        return $this;
    }
}

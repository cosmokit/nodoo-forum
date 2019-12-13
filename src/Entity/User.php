<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource(
 *      normalizationContext={"groups"={"users_read"}},
 *      itemOperations={
 *         "get",
 *         "put"={"security"="is_granted('ROLE_ADMIN') or object == user"},
 *         "delete"={"security"="is_granted('ROLE_ADMIN') or object == user"}
 *      },
 *      subresourceOperations={
 *          "topics_get_subresource"={},
 *          "topicReplies_get_subresource"={}
 *      }
 * )
 * @ApiFilter(SearchFilter::class, properties={"username":"partial"})
 * @ApiFilter(OrderFilter::class, properties={"created_at"})
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="users")
 * @UniqueEntity(fields={"email"}, message="This email address is already used.")
 * @UniqueEntity(fields={"username"}, message="This username is already used")
 * @Vich\Uploadable()
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"users_read", "topics_read", "topicsReplies_read", "topics_replies_subresources", "subcategories_topics_subresources"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\Length(min=4, max=30)
     * @Assert\NotBlank
     * @Groups({"users_read", "topics_read", "topicsReplies_read", "topics_replies_subresources", "subcategories_topics_subresources"})
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email
     * @Assert\NotBlank
     * @Groups({"users_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"users_read", "topics_read", "topicsReplies_read", "topics_replies_subresources"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\Length(min=4, max=30)
     * @Assert\NotBlank
     */
    private $password;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"users_read", "topics_read", "topicsReplies_read", "topics_replies_subresources", "subcategories_topics_subresources"})
     * @Gedmo\Timestampable(on="create")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Gedmo\Timestampable(on="update")
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"users_read", "topics_read", "topicsReplies_read", "topics_replies_subresources", "subcategories_topics_subresources"})
     */
    private $avatar;

    /**
     * @var File|null
     * @Assert\Image()
     * @Vich\UploadableField(mapping="user_avatar", fileNameProperty="avatar")
     */
    private $imageFile;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Topic", mappedBy="author", orphanRemoval=true)
     * @ApiSubresource
     * @Groups({"users_read"})
     */
    private $topics;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\TopicReply", mappedBy="author", orphanRemoval=true)
     * @ApiSubresource
     * @Groups({"users_read"})
     */
    private $topicReplies;

    public function __construct()
    {
        $this->topics = new ArrayCollection();
        $this->topicReplies = new ArrayCollection();
        $this->setAvatar("default.png");
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

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

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    /**
     * @param string|null $avatar
     * @return User
     */
    public function setAvatar(?string $avatar): User
    {
        $this->avatar = $avatar;
        return $this;
    }

    /**
     * @return File|null
     */
    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    /**
     * @param File|null $imageFile
     * @return User
     */
    public function setImageFile(?File $imageFile): User
    {
        $this->imageFile = $imageFile;
        if ($this->imageFile instanceof UploadedFile) {
            $this->updatedAt = new \DateTime('now');
        }
        return $this;
    }

    /**
     * @return Collection|Topic[]
     */
    public function getTopics(): Collection
    {
        return $this->topics;
    }

    public function addTopic(Topic $topic): self
    {
        if (!$this->topics->contains($topic)) {
            $this->topics[] = $topic;
            $topic->setAuthor($this);
        }

        return $this;
    }

    public function removeTopic(Topic $topic): self
    {
        if ($this->topics->contains($topic)) {
            $this->topics->removeElement($topic);
            // set the owning side to null (unless already changed)
            if ($topic->getAuthor() === $this) {
                $topic->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TopicReply[]
     */
    public function getTopicReplies(): Collection
    {
        return $this->topicReplies;
    }

    public function addTopicReply(TopicReply $topicReply): self
    {
        if (!$this->topicReplies->contains($topicReply)) {
            $this->topicReplies[] = $topicReply;
            $topicReply->setAuthor($this);
        }

        return $this;
    }

    public function removeTopicReply(TopicReply $topicReply): self
    {
        if ($this->topicReplies->contains($topicReply)) {
            $this->topicReplies->removeElement($topicReply);
            // set the owning side to null (unless already changed)
            if ($topicReply->getAuthor() === $this) {
                $topicReply->setAuthor(null);
            }
        }

        return $this;
    }
}

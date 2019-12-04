<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      normalizationContext={"groups"={"subcategories_read"}},
 *      subresourceOperations={
 *          "api_categories_subcategories_get_subresource"={"normalization_context"={"groups"={"categories_subcategories_subresources"}}},
 *          "topics_get_subresource"={}
 *      }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\SubcategoryRepository")
 * @ORM\Table(name="forum_subcategories")
 */
class Subcategory
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"subcategories_read", "categories_read", "topics_read", "categories_subcategories_subresources", "users_topics_subresources"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=4, max=35)
     * @Assert\NotBlank
     * @Groups({"subcategories_read", "categories_read", "topics_read", "categories_subcategories_subresources", "users_topics_subresources"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=4, max=60)
     * @Assert\NotBlank
     * @Groups({"subcategories_read", "categories_read", "topics_read", "categories_subcategories_subresources", "users_topics_subresources"})
     * @Gedmo\Slug(fields={"name"})
     */
    private $slug;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Category", inversedBy="subcategories")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"subcategories_read"})
     */
    private $category;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Topic", mappedBy="subcategory", orphanRemoval=true)
     * @ApiSubresource
     * @Groups({"subcategories_read"})
     */
    private $topics;

    public function __construct()
    {
        $this->topics = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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
            $topic->setSubcategory($this);
        }

        return $this;
    }

    public function removeTopic(Topic $topic): self
    {
        if ($this->topics->contains($topic)) {
            $this->topics->removeElement($topic);
            // set the owning side to null (unless already changed)
            if ($topic->getSubcategory() === $this) {
                $topic->setSubcategory(null);
            }
        }

        return $this;
    }
}

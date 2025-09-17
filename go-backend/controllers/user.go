package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sleepbot-zapp/go-backend/database"
	"github.com/sleepbot-zapp/go-backend/models"
)

func SaveUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := database.DB.Where(models.User{Email: user.Email}).
		Assign(models.User{Name: user.Name, Image: user.Image}).
		FirstOrCreate(&user).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "user": user})
}

func ShowUser(c *gin.Context) {
	var req struct {
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&req); err != nil || req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	var user models.User
	if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func UpdateUser(c *gin.Context) {
	var req struct {
		Email   string `json:"email"`
		Name    string `json:"name,omitempty"`
		Phone   string `json:"phone,omitempty"`
		State   string `json:"state,omitempty"`
		College string `json:"college,omitempty"`
		Image   string `json:"image,omitempty"`
	}

	if err := c.ShouldBindJSON(&req); err != nil || req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	var user models.User
	if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if req.Name != "" {
		user.Name = req.Name
	}
	if req.Phone != "" {
		user.Phone = req.Phone
	}
	if req.State != "" {
		user.State = req.State
	}
	if req.College != "" {
		user.College = req.College
	}
	if req.Image != "" {
		user.Image = req.Image
	}

	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

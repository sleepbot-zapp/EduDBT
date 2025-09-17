package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name    string `json:"name"`
	Email   string `json:"email" gorm:"uniqueIndex"`
	Image   string `json:"image"`
	Phone   string `json:"phone"`
	State   string `json:"state"`
	College string `json:"college"`
}

// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

package model

import (
	"encoding/json"
	"io"
	//"strconv"
)

const (
	USER_AUTH_SERVICE_GITLAB = "gitlab"
)

type GitLabUser struct {
	Uid       string  `json:"uid"`
	DisplayName string `json:"displayName"`
	Email    string `json:"email"`
	//Name     string `json:"displayname"`
}

func UserFromGitLabUser(glu *GitLabUser) *User {
	user := &User{}
	user.Username = CleanUsername(glu.DisplayName)
	user.Email = glu.Email
	user.AuthData = glu.Uid
	user.AuthService = USER_AUTH_SERVICE_GITLAB

	return user
}

func GitLabUserFromJson(data io.Reader) *GitLabUser {
	decoder := json.NewDecoder(data)
	var glu GitLabUser
	err := decoder.Decode(&glu)
	if err == nil {
		return &glu
	} else {
		return nil
	}
}

func (glu *GitLabUser) GetAuthData() string {
	return glu.Uid
}

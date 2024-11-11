package com.korit.board_back.dto.user.response;

import com.korit.board_back.entity.User;
import lombok.Getter;

@Getter
public class UserResponseDto {
    private String userId;
    private String email;
    private String name;
    private String phone;
    private String gender;

    // setter의 역할을 대신하는 생성자
    // 이 생성자를 통해서만 구현이 가능
    public UserResponseDto (User user) {
        this.userId = user.getUserId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.gender = user.getGender();
    }
}

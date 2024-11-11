package com.korit.board_back.service.implement;

import com.korit.board_back.common.ResponseMessage;
import com.korit.board_back.dto.ResponseDto;
import com.korit.board_back.dto.user.request.UpdateUserRequestDto;
import com.korit.board_back.dto.user.response.UserResponseDto;
import com.korit.board_back.entity.User;
import com.korit.board_back.repository.UserRepository;
import com.korit.board_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/*
    Implement의 축약어: Impl
*/
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseDto<UserResponseDto> getUserInfo(String userId) {
        UserResponseDto data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElse(null);

            if (user == null) {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
            }

            data = new UserResponseDto(user);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<UserResponseDto> updateUser(String userId, UpdateUserRequestDto dto) {
        UserResponseDto data = null;
        String email = dto.getEmail();
        String name = dto.getName();
        String phone = dto.getPhone();

        try {
            User user = userRepository.findByUserId(userId)
                    .orElse(null);

            if (user == null) ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
//            if (user == null) {
//                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);
//            }

//            user.setEmail(email);
//            user.setName(name);
//            user.setPhone(phone);

            // 처음 객체 생성할 때 클래스 단위(User)에서 사용
//            user = User.builder()
//                    .email(email)
//                    .name(name)
//                    .phone(phone)
//                    .build();

            // user로 사용 가능
            user = user.toBuilder()
                    .email(email)
                    .name(name)
                    .phone(phone)
                    .build();

            userRepository.save(user);
            data = new UserResponseDto(user);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<Void> deleteUser(String userId) {
        ResponseDto<Void> data = null;

        try {
            User user = userRepository.findByUserId(userId)
                    .orElse(null);

            if (user == null) ResponseDto.setFailed(ResponseMessage.NOT_EXIST_USER);

            userRepository.delete(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, null);
    }
}

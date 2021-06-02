package board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import board.dto.StudyDto;

@Mapper
public interface StudyMapper {
	List<StudyDto> selectStudyList() throws Exception;
	List<StudyDto> searchStudyList() throws Exception;		//검색
}

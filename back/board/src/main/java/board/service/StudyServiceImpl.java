package board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import board.dto.StudyDto;
import board.mapper.StudyMapper;

@Service
public class StudyServiceImpl implements StudyService {

	@Autowired
	private StudyMapper studyMapper;
	
	@Override
	public List<StudyDto> selectStudyList() throws Exception {
		// TODO Auto-generated method stub
		
		return studyMapper.selectStudyList();
	}

	@Override
	public List<StudyDto> searchStudyList() throws Exception {
		// TODO Auto-generated method stub
		
		return studyMapper.searchStudyList();
	}

}

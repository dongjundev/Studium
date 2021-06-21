package board.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.File;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import board.dto.BoardDto;
import board.dto.BoardFileDto;
import board.dto.MemberDto;
import board.dto.ReportDto;
import board.dto.StudyDto;
import board.service.BoardService;
import board.service.MemberService;
import board.service.ReportService;
import board.service.StudyService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class ReactController {
	MemberDto memberDto=null;

	int glo_studyId;
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private StudyService studyService;
	
	@Autowired
	private ReportService reportService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	// Main ----------------------------
	@GetMapping(value = {"/home", "/"})
	public List<Object> selectStudyList() throws Exception{
		
		List<Object> result=new ArrayList<>();
		
		List<StudyDto> list = studyService.selectStudyList();
		
		for(int i=0; i<list.size(); i++) {
			if (list.get(i).getMemberId()==null) {
				continue;
			}
			String[] memberList = list.get(i).getMemberId().split(",");
			int memberCount = memberList.length;
			list.get(i).setMemberCnt(memberCount);
		}
		List<StudyDto> eventList=studyService.selectEventList();
		
		result.add(list);
		result.add(eventList);
		
		return result;
	}
	
	// 회원가입 ----------------------------
	@ResponseBody
	@PostMapping(value="/signup.do")
	public String signUp(@RequestBody MemberDto memberDto,HttpServletRequest request) throws Exception {
	
		MemberDto member = new MemberDto();
		
		System.out.println(memberDto.getMemberId());
		System.out.println(memberDto.getMemberName());
		System.out.println(memberDto.getMemberAddress());
		System.out.println(memberDto.getMemberGender());
		System.out.println(memberDto.getMemberRePassword());
		
		member.setMemberId(memberDto.getMemberId());
		member.setMemberName(memberDto.getMemberName());
		member.setMemberAddress(memberDto.getMemberAddress());
		member.setMemberGender(memberDto.getMemberGender());
		
		
		int result=memberService.idChk(memberDto.getMemberId());
		
		System.out.println(result);
		
		if(result==1) {
			// 아이디가 중복이면 
			System.out.println("아이디가 중복입니다.");
			//return "redirect:/user/join.do";
			return "404";
		}
		else if (result==0){
			// 아이디가 중복이 아니면 && 비밀번호가 일치하면 db에 insert
			if (memberDto.getMemberRePassword().equals(memberDto.getMemberPassword())) {
				String password=passwordEncoder.encode(memberDto.getMemberPassword());
				
				member.setMemberPassword(password);
				memberService.insertMember(member);
			}
			else {
				System.out.println("비밀번호가 맞지 않습니다.");
				return "404";
			}
		}
		
		member=null;
		//return "redirect:/user/login.do";
		System.out.println("가입완료");
		return "ok";
	}

	// 로그인 ----------------------------
	@ResponseBody
	@PostMapping(value="/login.do")
	public String login(@RequestBody MemberDto memberDto,HttpServletRequest request) throws Exception{
		  System.out.println("들어옴"+memberDto.getMemberId()+memberDto.getMemberPassword()); 
		  //memberDto.getMemberId();
		  //memberDto.getMemberPassword();
		 
		  String DBPassword = memberService.login(memberDto.getMemberId()); 
		  
		  //사용자에게 받은 값:: member.getMemberPw()
		  //db에서 받은 값:: dbPwd
		  if (DBPassword !=null) {
			  if (BCrypt.checkpw(memberDto.getMemberPassword(), DBPassword) == true) {
				  System.out.println("로그인 성공"); 
				  
				  // 서버에 세션 id 발급, 서버에서 받은 세션을 클라이언트 브라우저의 쿠키가 저장하여 가지고 있어야 함
				  //RequestAttributes requestAttribute = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
				  //requestAttribute.setAttribute("login", null, RequestAttributes.SCOPE_SESSION);
				  
				  HttpSession session = (HttpSession)request.getSession();
				  session.setAttribute("loginUser", memberDto);

				  // 세션 아이디 가져오기
				  //System.out.println("세션 아이디 :: "+requestAttribute.getSessionId());
				  System.out.println("세션 아이디2 :: "+session.getId());
				  //return "redirect:/home";
				  
				  
				  return "ok";
			  }
			  else {
				  System.out.println("로그인 실패"); 
				
			  }
		  }
		  else {
			  System.out.println("해당하는 아이디가 없습니다");
			  System.out.println("로그인 실패");
		  }
		  //return "redirect:/user/login.do";
		  return "404";
	}

	
	// StudyDetail----------------------------
	@GetMapping("/study/{studyId}")
    public ArrayList<Object> StudyDetail(@PathVariable(name = "studyId") int studyId) throws Exception{		
 
		ArrayList<Object> studyDetail=new ArrayList<>();
		ArrayList<MemberDto> memberList = new ArrayList<>();
		List<StudyDto> eventList = studyService.selectStudyEvent(studyId);
	    
    	StudyDto study = studyService.selectStudyDetail(studyId);
    	
    	//현재 스터디 전역변수로 저장
    	glo_studyId=studyId;
    	
    	//멤버 리스트
    	String[] member=study.getMemberId().split(",");

    	//System.out.println("멤버 리스트 :: "+Arrays.toString(memberList));
    	//System.out.println("멤버 리스트 길이 :: "+memberList.length);
    	
    	for (int i=0; i<member.length; i++) {
    		//스터디 멤버
        	MemberDto mem= memberService.selectStudyMemberDetail(String.valueOf(member[i]));
        	memberList.add(mem);
    	}
		
    	//멤버 count
		int memberCount = member.length;
		study.setMemberCnt(memberCount);

    	//이벤트 리스트
    	List<StudyDto> eventList = studyService.selectStudyEvent(studyId);
    	
    	studyDetail.add(study);
    	studyDetail.add(memberList);
    	studyDetail.add(eventList);
    	
    	return studyDetail;
    }
	
    // StudyJoin----------------------------
    @RequestMapping("/study/{studyId}/join.do")
    public String StudyJoin(@PathVariable(name = "studyId") int studyId,@ModelAttribute MemberDto member,HttpSession session) throws Exception{	
    	
    	
    	MemberDto mem=(MemberDto) session.getAttribute("loginUser");
    	System.out.println("member확인:: "+mem);

    	if (mem==null) {
    		System.out.println("로그인 해주세요.");
    		return "404";
    	}
    	else {
	    	System.out.println("member확인:: "+studyId);
	    	// studyService.studyJoinChk(studyId) = 1,2,3,4
	    	
	    	String[] result_list=studyService.studyJoinChk(studyId).split(",");
	    	String memberId=mem.getMemberId();
	
	    	for (int i=0;i<result_list.length;i++) {
	    		if (result_list[i].equals(memberId)) {
	    			System.out.println("중복 가입입니다.");
	    			return "404";
	    		}
	    	}
	    	if (memberId==null){
	    		studyService.studyJoin(memberId,studyId);
	    	}
	    	else {
	    		memberId=','+memberId;
	    		studyService.studyJoin(memberId,studyId);
	    	}
	    	System.out.println("스터디 가입 완료");
    		return "ok";
    	}
    }
	
	// EventList----------------------------
	@GetMapping("/study/{studyId}/event")
    public List<StudyDto> EventList(@PathVariable(name = "studyId") int studyId) throws Exception{		
 
		List<StudyDto> event = studyService.selectStudyEvent(studyId);
		
    	//System.out.println("이벤트 리스트 :: "+event);
    	
    	return event;
    }
	
	// EventDetail----------------------------
	@GetMapping("/event/{eventId}")
    public List<Object> EventDetail(@PathVariable(name = "eventId") int eventId) throws Exception{		
		
		List<Object> eventDetail=new ArrayList<>();
		List<MemberDto> memberList=new ArrayList<>();
		
		//이벤트 정보
		StudyDto event = studyService.selectEventDetail(eventId);

		//이벤트가 속한 스터디 정보
		StudyDto study=studyService.selectStudyDetail(event.getStudyId());
		
		eventDetail.add(event);
		eventDetail.add(study);
		//참석자
		//멤버 리스트
    	String[] member=event.getEventAttandentId().split(",");

    	//System.out.println("멤버 리스트 :: "+Arrays.toString(memberList));
    	//System.out.println("멤버 리스트 길이 :: "+memberList.length);
    	
    	for (int i=0; i<member.length; i++) {
    		//스터디 멤버
        	MemberDto mem= memberService.selectStudyMemberDetail(String.valueOf(member[i]));
        	System.out.println("멤버 리스트 :: "+mem);
        	memberList.add(mem);
    	}
    	
		eventDetail.add(memberList);		
    	return eventDetail;
    }
	
	// GalleryList----------------------------
	@GetMapping("/study/{studyId}/gallery")
    public List<BoardDto> GalleryList(@PathVariable(name = "studyId") int studyId,HttpSession session) throws Exception{		
 
		List<BoardDto> board = boardService.selectBoardList(studyId);
		
    	return board;
    }
	
	// EventJoin------------------------------
    @RequestMapping("/event/{eventId}/join.do")
    public String EventJoin(@PathVariable(name = "eventId") int eventId,HttpSession session) throws Exception{	
    	MemberDto mem=(MemberDto) session.getAttribute("loginUser");
    	System.out.println("member확인:: "+mem);
    	
    	if (mem==null) {
    		System.out.println("로그인 해주세요.");
    		return "404";
    	}
    	else {
        	String memberId=mem.getMemberId();
        	
        	//이벤트 정보
    		StudyDto event = studyService.selectEventDetail(eventId);

    		//이벤트가 속한 스터디 정보
    		StudyDto study=studyService.selectStudyDetail(event.getStudyId());
    		String[] study_member_list=study.getMemberId().split(",");
    		System.out.println("study_member_list :: "+Arrays.toString(study_member_list));
    		
    		//이벤트 참석자 리스트
        	String[] event_attendent_list=studyService.eventJoinChk(eventId).split(",");
        	System.out.println("event_attendent_list :: "+Arrays.toString(event_attendent_list));
        	
        	//1.이벤트가 속한 스터디의 참여자인지 확인
        	//1-1.만약 참여자라면, 이 이벤트에 참여해있는지 확인
        	//2.이벤트에 참여되어있는지 확인
        	//2-1.이벤트에 참여되어있지 않다면 event_attendant_id에 memberId 추가
        	
	    	for (int i=0; i<study_member_list.length; i++) {
	    		System.out.println("for문 :: "+i);
	    		if (study_member_list[i].equals(memberId)) {
	    			System.out.println("스터디에 속해 있습니다.");
	    			
	    			for (int j=0; j<event_attendent_list.length; j++) {
	    				if (event_attendent_list[j].equals(memberId)) {
	    					System.out.println("이미 이벤트에 참여중입니다.");
	    					return "404";
	    				}
	    			}
	    			studyService.eventJoin(eventId,memberId);
	        		return "ok";
	    		}
	    	}
	    	System.out.println("스터디에 가입해주세요!");
	    	return "404";
    	}
    }
    
    // MemberDetail----------------------------
 	@GetMapping("/member")
     public ArrayList<MemberDto> MemberDetail(@RequestParam(defaultValue="memberId")String memberId) throws Exception{		
  
 		ArrayList<MemberDto> memberDetail = new ArrayList<>();
     	MemberDto member = memberService.selectStudyMemberDetail(memberId);
     	memberDetail.add(member);
     	
     	return memberDetail;
     }
 	
 	// Study 생성----------------------------
 	@GetMapping("/create-study.do")
    public String MakeStudyDescription(@RequestParam(defaultValue="studyName")String studyName,@RequestParam(defaultValue="studyDescription")String studyDescription,
			@RequestParam(defaultValue="studyTag")String studyTag,@RequestParam(defaultValue="memberId")String memberId,
			@RequestParam(defaultValue="studyLocation")String studyLocation) throws Exception{
 		
 		StudyDto studyDto=null;
 		studyDto = new StudyDto();
 		
 		studyDto.setStudyName(studyName);
 		studyDto.setStudyDescription(studyDescription);
 		studyDto.setStudyTag(studyTag);
 		studyDto.setMemberId(memberId);
 		studyDto.setStudyLocation(studyLocation);

    	studyService.insertStudy(studyDto);
    	studyDto = null;
    	
    	return "ok";
    }
 	
 	// 카테고리 검색---------------------------
 	@GetMapping("/search/{tagId}")
    public List<StudyDto> CategorySearch(@PathVariable(name = "tagId") int tagId) throws Exception{
 		List<StudyDto> list = studyService.selectStudyList();
 		List<StudyDto> result= new ArrayList<>();
 		
 		String stagId=null;
 		if (tagId==1) {
 			stagId="외국어";
 			}
 		else if(tagId==2) {
 			stagId="운동";
 		}
 		else {
 			stagId="기타";
 		}
 		
		for(int i=0; i<list.size(); i++) {
			System.out.println("search 확인 :: "+list.get(i));
			
			if (list.get(i).getStudyTag()==null) {
				continue;
			}
			String[] TagList = list.get(i).getStudyTag().split(",");
			System.out.println("TagList 확인 :: "+Arrays.toString(TagList));
			
			for (int j=0; j<TagList.length; j++) {
				System.out.println("Tag 확인 :: "+TagList[j]);
				
				if (TagList[j].equals(stagId)) {
					int studyId=list.get(i).getStudyId();
					result.add(studyService.selectStudyDetail(studyId));
				}
				else {
					continue;
				}
			}
		}
		
		return result;
    }
 	
 	// 키워드검색---------------------------
 	@GetMapping("/search")
    public List<StudyDto> KeywordSearch(@RequestParam(defaultValue="keyword")String keyword,@RequestParam(defaultValue="searchCondition")String searchCondition) throws Exception{
 		
 		List<StudyDto> searchList = studyService.searchStudy(searchCondition,keyword);
 		//List<StudyDto> result= new ArrayList<>();
		
		return searchList;
    }
    
 	// GalleryDetail----------------------------
 	@GetMapping("/gallery/{boardIdx}")
     public List<Object> GalleryDetail(@PathVariable(name = "boardIdx") int boardIdx,HttpSession session) throws Exception{		
 
 		BoardFileDto boardFile = boardService.selectBoardFileInformation(boardIdx);
 		BoardDto board = boardService.selectBoardDetail(boardIdx);
 		System.out.println("파일 정보 :: "+boardFile);
 		
 		List<Object> gallery = new ArrayList<>();
 		gallery.add(boardFile);
 		gallery.add(board);
 		
     	return gallery;
     }
 	
// 	// GalleryInsert----------------------------
// 	@RequestMapping("/gallery/insertBoard.do")	//작성된 게시글 등록
//    public String GalleryInsert(@RequestParam(defaultValue="title")String title,@RequestParam(defaultValue="content")String content, MultipartHttpServletRequest multipartHttpServletRequest,HttpSession session) throws Exception{
//    	BoardDto board=null;
//    	board = new BoardDto();
//    	
//    	MemberDto mem=(MemberDto) session.getAttribute("loginUser");
//    	
// 		board.setStudyId(glo_studyId);
// 		board.setContents(content);
// 		board.setCreatorId(mem.getMemberId());
// 		board.setTitle(title);
// 		
//    	boardService.insertBoard(board, multipartHttpServletRequest);
//    	return "ok";
//    }
 	
 	// GalleryFileDownload----------------------------
    @GetMapping("/gallery/downloadBoardFile.do")
    public void downloadBoardFile(@RequestParam int boardIdx, HttpServletResponse response) throws Exception{
    	System.out.println("들어옴");
    	BoardFileDto boardFile = boardService.selectBoardFileInformation(boardIdx);
    	if(ObjectUtils.isEmpty(boardFile) == false) {
    		String fileName = boardFile.getOriginalFileName();
    		
    		byte[] files = FileUtils.readFileToByteArray(new File(boardFile.getOriginalFilePath()));
    		
    		response.setContentType("application/octet-stream");
    		response.setContentLength(files.length);
    		response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(fileName, "UTF-8")+"\";");
    		response.setHeader("Content-Transfer-Encoding", "binary");
    		
    		response.getOutputStream().write(files);
    		response.getOutputStream().flush();
    		response.getOutputStream().close();
    	}
    }
    
    // 스터디 신고
    @ResponseBody
	@PostMapping(value="/report-study.do")
	public String reportStudy(@RequestBody StudyDto studyDto,@RequestBody ReportDto reportDto,HttpServletRequest request,HttpSession session) throws Exception{	
    	// 스터디 아이디, 신고자 신원, 신고 이유 
    	System.out.println("들어옴 :: ");
    	MemberDto mem=(MemberDto) session.getAttribute("loginUser");
    	System.out.println("member확인:: "+mem);
    	
    	System.out.println("스터디 아이디 :: "+studyDto.getStudyId());
    	System.out.println("신고자 신원 :: "+mem.getMemberId());
    	System.out.println("신고 이유 :: "+reportDto.getReportDescription());
    	
    	reportService.reportStudy(studyDto.getStudyId(),mem.getMemberId(),reportDto.getReportDescription());
 		
     	return "ok";
     }
    
    // 멤버 신고
    @ResponseBody
	@PostMapping(value="/report-member.do")
	public String reportMember(@RequestBody MemberDto memberDto,@RequestBody ReportDto reportDto,HttpServletRequest request,HttpSession session) throws Exception{	
    	// 멤버 아이디, 신고자 신원, 신고 이유  
    	MemberDto mem=(MemberDto) session.getAttribute("loginUser");
    	System.out.println("member확인:: "+mem);
    	
    	System.out.println("멤버 아이디 :: "+memberDto.getMemberId());
    	System.out.println("신고자 신원 :: "+mem.getMemberId());
    	System.out.println("신고 이유 :: "+reportDto.getReportDescription());
    	
    	reportService.reportMember(memberDto.getMemberId(),mem.getMemberId(),reportDto.getReportDescription());
 		
     	return "ok";
     }
    
    // Mypage
    @ResponseBody
	@PostMapping(value="/mypage")
	public List<MemberDto> myPage(HttpServletRequest request,HttpSession session) throws Exception{	

    	MemberDto mem=(MemberDto) session.getAttribute("loginUser");
    	System.out.println("member확인:: "+mem);
    	System.out.println("member Id 확인 :: "+mem.getMemberId());
    	
    	ArrayList<MemberDto> memberDetail = new ArrayList<>();
    	
     	MemberDto member = memberService.selectStudyMemberDetail(mem.getMemberId());
     	memberDetail.add(member);
     	
     	return memberDetail;
     }

}

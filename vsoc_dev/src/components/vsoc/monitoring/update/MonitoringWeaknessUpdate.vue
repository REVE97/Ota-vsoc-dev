<template>
  <div class="inner">
    <section class="location">
      <span>home</span>
      <span>모니터링 리포트</span>
      <span>리포트 수정</span>
    </section>
    <section class="step">
      <ul>
        <li>
          <strong>Event Report</strong>
        </li>
        <li class="active">
          <strong>Weakness Report</strong>
        </li>
        <li>
          <strong>Vulnerability Report</strong>
        </li>
        <li>
          <strong>Cybersecurity Incident Response Report</strong>
        </li>
      </ul>
    </section>
    <section class="page write">
      <article class="table">
        <p class="guide">
          * 표시는 필수 입력 항목입니다.
        </p>
        <table>
          <colgroup>
            <col width="240px" />
            <col width="auto" />
            <col width="240px" />
            <col width="auto" />
          </colgroup>
          <tbody>
            <tr>
              <th>Weakness ID</th>
              <td>{{ getData?.id }}</td>
              <th>Event ID</th>
              <td>{{ getData?.evenReport?.id }}</td>
            </tr>
            <tr>
              <th>제품명</th>
              <td>{{ getData?.evenReport?.productName }}</td>
              <th>프로젝트명</th>
              <td>{{ getData?.evenReport?.projectName }}</td>
            </tr>
            <tr>
              <th>연관된 Asset</th>
              <td>{{ getData?.evenReport?.associatedAsset }}</td>
              <th>CS Info 이름</th>
              <td>{{ getData?.evenReport?.csInfoName }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{{ getData?.evenReport?.description }}</td>
              <th class="required">사이버 보안 자산</th>
              <td class="select">
                <select v-model="postData.data.cyberAsset">
                  <option value="">선택</option>
                  <option value="Confidential(기밀성)">Confidential(기밀성)</option>
                  <option value="Integrity(무결성)">Integrity(무결성)</option>
                  <option value="Availability(가용성)">Availability(가용성)</option>
                  <option value="Authenticity(인증)">Authenticity(인증)</option>
                  <option value="Authorization(권한)">Authorization(권한)</option>
                  <option value="Non-requdiation(부인방지)">Non-requdiation(부인방지)</option>
                </select>
              </td>
            </tr>
            <tr>
              <th class="required">위협 시나리오 분석 결과</th>
              <td class="input">
                <input type="text" placeholder="위협 시나리오 분석 결과를 입력해주세요" v-model="postData.data.threatScenarioResult"/>
              </td>
              <th class="required">공격 경로</th>
              <td class="input">
                <input type="text" placeholder="공격 경로를 입력해주세요" v-model="postData.data.attackPath"/>
              </td>
            </tr>
            <tr>
              <th class="required">Weakness 식별</th>
              <td class="input">
                <input type="text" placeholder="약점 식별을 입력해주세요" v-model="postData.data.weaknessIdentified"/>
              </td>
              <th class="required">Weakness 식별 사유</th>
              <td class="input">
                <input type="text" placeholder="취약점 식별 사유를 입력해주세요" v-model="postData.data.weaknessReason"/>
              </td>
            </tr>
            <tr>
              <th class="required">담당자</th>
              <td class="input">
                <input type="text" placeholder="담당자 이름을 입력해주세요" v-model="postData.data.manager"/>
              </td>
              <th></th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="group button">
        <button @click="openCancelConfirm" class="cancel">취소</button>
        <button @click="postfetch_weakness" :disabled="!isAllInput">저장</button>
      </article>

      <!-- modal -->
      <VsocModal />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '@/store/app';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import VsocModal from '../../modal/VsocModal.vue';

const store = useAppStore();
const router = useRouter();
const route = useRoute();

// 약점 리포트 작성 POST 데이터 상태값
const postData = ref({
  reportType: "weakness",
  data: {
    id: route.params.weaknessReportId,
    eventReportId: null,
    cyberAsset: "",
    threatScenarioResult: "",
    attackPath: "",
    weaknessIdentified: "",
    weaknessReason: "",
    manager: "",
  }
})

// 약점 리포트 상세조회 전체 데이터
const getData = ref(null);

// 사용자가 필수 요소를 모두 입력해야 버튼 활성화
const isAllInput = computed(() => {
  return Object.values(postData.value.data).every(
    (value) => value !== null && value !== undefined && value !== ""
  );
});

// 약점 리포트 작성 API 호출 
const postfetch_weakness = async() => {
  try {
    const res = await axios.post('/api/vsoc/monitoring-report',postData.value);

    if(res.data.resultCode === -1) {
      alert('데이터 전송 실패');
    } else {
      openSaveDone();
    }
  } catch (error) {
    console.error(error);
    alert('데이터 전송 실패');
  }
}

// 모니터링 리포트 약점 리포트 상세조회 API 호출
const getfetch_weakness_detail = async() => {
  try {
    const weaknessReportId = route.params.weaknessReportId;
    const res = await axios.get(`/api/vsoc/monitoring-report/weakness/${weaknessReportId}`);
    getData.value = res.data.data.report;

    postData.value.data.eventReportId = getData.value?.evenReport?.id ?? ""
    postData.value.data.cyberAsset = getData.value?.cyberAsset ?? ""
    postData.value.data.threatScenarioResult = getData.value?.threatScenarioResult ?? ""
    postData.value.data.attackPath = getData.value?.attackPath ?? ""
    postData.value.data.weaknessIdentified = getData.value?.weaknessIdentified ?? ""
    postData.value.data.weaknessReason = getData.value?.weaknessReason ?? ""
    postData.value.data.manager = getData.value?.manager ?? ""
  } catch (error) {
    console.error(error);
    alert('데이터 불러오기 실패');
  }
}

// Modal 
const goList = () => {
  router.push({
    name: 'monitoring_weakness_detail',
    params: { weaknessReportId: route.params.weaknessReportId },
  })
}

const openSaveDone = () => {
  store.setModalInfo({
    on: true,
    type: "onebtn",
    iconClass: "success",
    textArea: "수정되었습니다.",
    btnText: "확인",

    rightBtn: () => { goList(); },
  })
};

const openCancelConfirm = () => {
  store.setModalInfo({
    on: true,
    type: "twobtn",
    iconClass: "success",
    textArea: "아직 등록되지 않은 내용이 있습니다. 페이지를 나가면 작성하신 내용이 모두 사라집니다.",

    rightBtn: () => { goList(); },
  })
};

onMounted(getfetch_weakness_detail);
</script>
